// CallComponent.jsx
import { useEffect, useRef, useState } from 'react';
import { getSocket } from '../../socket'
import { ANSWER_CALL, CALL_ANSWERED, CALL_USER, RECEIVE_CALL, RECEIVE_ICECANDIDATE, SEND_ICECANDIDATE } from '../../Constants/events';
import { FaPhone } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Call = ({ userId }) => {
    const socket = getSocket()
    const [inCall, setInCall] = useState(false);
    const [callAccepted, setCallAccepted] = useState(false);
    const [localStream, setLocalStream] = useState(null);
    const [callerInfo, setCallerInfo] = useState(null); // Store caller info when receiving a call
    const localStreamRef = useRef(null);
    const remoteStreamRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        // Handle incoming call
        socket.on(RECEIVE_CALL, ({ offer, from }) => {
            if (from !== user?._id) {
                setCallerInfo({ offer, from }); // Only set caller info if the call is not from the current user
            }
        });

        // Handle call answer
        socket.on(CALL_ANSWERED, async ({ answer }) => {
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
            setCallAccepted(true);
        });

        // Handle ICE candidates
        socket.on(RECEIVE_ICECANDIDATE, async ({ candidate }) => {
            if (candidate) {
                await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
            }
        });

        // Clean up on component unmount
        return () => {
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
            socket.off(RECEIVE_CALL);
            socket.off(CALL_ANSWERED);
            socket.off(RECEIVE_ICECANDIDATE);
        };
    }, []);

    // Set the local stream to the audio element once it's available
    useEffect(() => {
        if (localStream && localStreamRef.current) {
            localStreamRef.current.srcObject = localStream;
        }
    }, [localStream]);

    // Function to initiate a call
    const startCall = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setLocalStream(stream); // Set the stream in the state
            peerConnectionRef.current = createPeerConnection(userId);
            stream.getTracks().forEach((track) => peerConnectionRef.current.addTrack(track, stream));
            const offer = await peerConnectionRef.current.createOffer();
            await peerConnectionRef.current.setLocalDescription(offer);
            socket.emit(CALL_USER, { offer, to: userId });
            setInCall(true);
        } catch (error) {
            console.error('Error accessing media devices.', error);
        }
    };

    // Function to accept a call
    const acceptCall = async () => {
        if (callerInfo) {
            const { offer, from } = callerInfo;
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setLocalStream(stream); // Set the stream in the state
            peerConnectionRef.current = createPeerConnection(from);
            stream.getTracks().forEach((track) => peerConnectionRef.current.addTrack(track, stream));
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(answer);
            socket.emit(ANSWER_CALL, { answer, to: from });
            setInCall(true);
            setCallAccepted(true);
            setCallerInfo(null); // Clear caller info after accepting
        }
    };

    // Function to create a peer connection
    const createPeerConnection = (calleeId) => {
        const peerConnection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit(SEND_ICECANDIDATE, { candidate: event.candidate, to: calleeId });
            }
        };

        peerConnection.ontrack = (event) => {
            if (remoteStreamRef.current) {
                remoteStreamRef.current.srcObject = event.streams[0];
            }
        };

        return peerConnection;
    };

    return (
        <div>
            {inCall ? (
                <>
                    <audio ref={localStreamRef} autoPlay muted />
                    {callAccepted && <audio ref={remoteStreamRef} autoPlay />}
                </>
            ) : (
                <button onClick={() => startCall(userId)} className="hover:bg-zinc-100 rounded-full p-2">
                    <FaPhone className="text-zinc-500" />
                </button>
            )}
        </div>
    );
};

export default Call;
