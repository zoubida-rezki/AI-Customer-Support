

// 'use client';

// import { Box, Button, Grid, Modal, Stack, TextField, Typography } from "@mui/material";
// import Rating from '@mui/material/Rating';
// import { useState, useEffect } from "react";
// import { collection, getDoc, getDocs, query, setDoc, doc } from "firebase/firestore";
// import { firestore } from "../firebase";


// // Chatbot Component
// function Chatbot() {
//   const [messages, setMessages] = useState([
//     { role: 'assistant', content: 'Hello! Welcome to Southwest Airlines customer support. How can I assist you today?' }
//   ]);

//   const sendMessage = async () => {
//     setMessage('');
//     setMessages((messages) => [...messages, { role: 'user', content: message }, { role: 'assistant', content: '' }]);
//     const response = await fetch('/api/chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify([...messages, { role: 'user', content: message }])
//     }).then(async (res) => {
//       const reader = res.body.getReader();
//       const decoder = new TextDecoder();
//       let result = '';
//       return reader.read().then(function processText({ done, value }) {
//         if (done) {
//           return result;
//         }

//         const text = decoder.decode(value || new Uint8Array(), { stream: true });
//         setMessages((messages) => {
//           let lastMessage = messages[messages.length - 1];
//           let otherMessages = messages.slice(0, messages.length - 1);
//           return [...otherMessages, { ...lastMessage, content: lastMessage.content + text }];
//         });
//         return reader.read().then(processText);
//       });
//     });
//   }

//   const [message, setMessage] = useState('');

//   return (
//     <Box
//       width="100%"
//       height='100vh'
//       display='flex'
//       flexDirection='column'
//       justifyContent='center'
//       alignItems='center'
//       bgcolor="#F3F4F6"
//       p={5}
//       // mb={4}
//       // sx={{ 
//       //   backgroundImage: 'url("/images/airplane-bg.jpg")', 
//       //   backgroundSize: 'cover', 
//       //   backgroundPosition: 'center',
//       //   borderBottom: '8px solid #004481'
//       // }}
//     >
//       <Stack direction={'column'} width='500px' height='100%' p={2} spacing={3} bgcolor="white" borderRadius={8} boxShadow={3}>
//         <Stack direction={'column'} spacing={2} flexGrow={1} overflow='auto' maxHeight='100%'>
//           {messages.map((message, index) => (
//             <Box
//               key={index}
//               display="flex"
//               justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
//             >
//               <Box
//                 bgcolor={message.role === 'assistant' ? '#004481' : '#C8102E'}
//                 color='white'
//                 borderRadius={16}
//                 p={3}
//                 boxShadow={2}
//               >
//                 {message.content}
//               </Box>
//             </Box>
//           ))}
//         </Stack>
//         <Stack direction={'row'} spacing={2}>
//           <TextField
//             label='Message'
//             fullWidth
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             variant="outlined"
//             InputLabelProps={{ style: { color: '#004481' } }}
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 '& fieldset': {
//                   borderColor: '#004481',
//                 },
//                 '&:hover fieldset': {
//                   borderColor: '#C8102E',
//                 },
//                 '&.Mui-focused fieldset': {
//                   borderColor: '#FFD100',
//                 },
//               },
//             }}
//           />
//           <Button 
//             variant="contained" 
//             onClick={sendMessage} 
//             sx={{ 
//               bgcolor: '#FFD100', 
//               color: '#004481', 
//               '&:hover': { 
//                 bgcolor: '#C8102E',
//                 color: 'white'
//               } 
//             }}>
//             Send
//           </Button>
//         </Stack>
//       </Stack>

// </Box>
//     // {/*  */}
//   );
// }

// function Reviews() {
//   const [feedback, setFeedback] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [reviewName, setReviewName] = useState('');
//   const [reviewRating, setReviewRating] = useState(1); // Added state for rating

//   const updateFeedback = async () => {
//     const snapshot = query(collection(firestore, 'feedback'));
//     const docs = await getDocs(snapshot);
//     const feedbackList = [];
//     docs.forEach((doc) => {
//       feedbackList.push({
//         name: doc.id,
//         ...doc.data(),
//       });
//     });
//     setFeedback(feedbackList);
//   };

//   const addReview = async (review) => {
//     const { name, rating } = review; // Destructure review object
  
//     // Use the review name as the document ID
//     const docRef = doc(collection(firestore, 'feedback'), name);
//     const docSnap = await getDoc(docRef);
  
//     if (docSnap.exists()) {
//       // Update the existing document
//       const { quantity } = docSnap.data();
//       await setDoc(docRef, { quantity: quantity + 1, rating }, { merge: true });
//     } else {
//       // Create a new document with the review data
//       await setDoc(docRef, { quantity: 1, rating });
//     }
  
//     // Update the feedback list
//     await updateFeedback();
//   };
  
//   useEffect(() => {
//     updateFeedback();
//   }, []);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <Box
//       width="100%"
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//       bgcolor= "#F3F4F6" //"#F8F9FA"
//       p={4}
//     >
//       <Typography 
//         variant="h2" 
//         sx={{ 
//           color: '#003B6F', 
//           textAlign: 'center', 
//           margin: '20px 0',
//           textTransform: 'uppercase',
//           fontWeight: 'bold'
//         }}
//       >
//         Chatbot Feedback
//       </Typography>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={{ 
//           position: 'absolute', 
//           top: '50%', 
//           left: '50%', 
//           transform: 'translate(-50%, -50%)', 
//           width: 400, 
//           bgcolor: 'white', 
//           border: '2px solid #003B6F', 
//           boxShadow: 24, 
//           p: 4, 
//           display: 'flex', 
//           flexDirection: 'column', 
//           gap: 3 
//         }}>
//           <Typography variant="h6" color="#003B6F">
//             Add Review
//           </Typography>
//           <Stack width="100%" direction="row" spacing={2}>
//             <TextField
//               id="outlined-basic"
//               label="Review"
//               variant="outlined"
//               fullWidth
//               value={reviewName}
//               onChange={(e) => setReviewName(e.target.value)}
//               InputProps={{
//                 style: { color: '#003B6F' },
//               }}
//               InputLabelProps={{
//                 style: { color: '#003B6F' },
//               }}
//             />
//             <Rating
//               name="review-rating"
//               value={reviewRating}
//               onChange={(event, newValue) => setReviewRating(newValue)}
//               size="large"
//               sx={{ alignSelf: 'center' }}
//             />
//             <Button
//               variant="contained"
//               onClick={() => {
//                 addReview({ name: reviewName, rating: reviewRating }); // Adjusted to include rating
//                 setReviewName('');
//                 setReviewRating(1); // Reset rating
//                 handleClose();
//               }}
//               sx={{ 
//                 background: '#F9A825', 
//                 color: '#003B6F', 
//                 border: 'none', 
//                 '&:hover': { 
//                   background: '#F57F17' 
//                 } 
//               }}
//             >
//               Add
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>
//       <Box width="100%" maxWidth="1200px" mb={2}>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
//           <Typography variant="h3" color="#003B6F">
//             Reviews
//           </Typography>
//           <Button 
//             variant="contained" 
//             onClick={handleOpen} 
//             sx={{ 
//               background: '#F9A825', 
//               color: '#003B6F', 
//               border: 'none', 
//               '&:hover': { 
//                 background: '#F57F17' 
//               } 
//             }}
//           >
//             Add A Review
//           </Button>
//         </Box>
//         <Grid container spacing={2}>
//           {feedback.map(({ name, rating }) => (
//             <Grid item xs={12} sm={6} md={4} key={name}>
//               <Box
//                 width="100%"
//                 minHeight="120px"
//                 display="flex"
//                 flexDirection="column"
//                 alignItems="center"
//                 justifyContent="center"
//                 bgcolor='#FFFFFF'
//                 padding={3}
//                 border="1px solid #003B6F"
//                 borderRadius={2}
//                 boxShadow={2}
//               >
//                 <Typography variant='h4' color="#003B6F" gutterBottom>
//                   {name.charAt(0).toUpperCase() + name.slice(1)}
//                 </Typography>
//                 <Rating
//                   name="read-only"
//                   value={rating}
//                   readOnly
//                   size="large"
//                 />
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// }

// // Main Home Component
// export default function Home() {
//   return (
//     <Box width="100%" display="flex" flexDirection="column" alignItems="center">
//       <Chatbot />
//       <Reviews />
//     </Box>
//   );
// }


'use client';

import { Box, Button, Grid, Modal, Stack, TextField, Typography } from "@mui/material";
import Rating from '@mui/material/Rating';
import { useState, useEffect } from "react";
import { collection, getDoc, getDocs, query, setDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase";

// Chatbot Component
function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! Welcome to Southwest Airlines customer support. How can I assist you today?' }
  ]);
  const [message, setMessage] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const sendMessage = async () => {
    setMessage('');
    setMessages((messages) => [...messages, { role: 'user', content: message }, { role: 'assistant', content: '' }]);
    setQuestionCount(prev => prev + 1); // Increment question count

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }])
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = '';
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }

        const text = decoder.decode(value || new Uint8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [...otherMessages, { ...lastMessage, content: lastMessage.content + text }];
        });
        return reader.read().then(processText);
      });
    });

    if (questionCount >= 2) { // Show popup after 3 questions
      setShowPopup(true);
    }
  }

  return (
    <Box
      width="100%"
      height='100vh'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      bgcolor="#F3F4F6"
      p={5}
    >
      <Stack direction={'column'} width='500px' height='100%' p={2} spacing={3} bgcolor="white" borderRadius={8} boxShadow={3}>
        <Stack direction={'column'} spacing={2} flexGrow={1} overflow='auto' maxHeight='100%'>
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              <Box
                bgcolor={message.role === 'assistant' ? '#004481' : '#C8102E'}
                color='white'
                borderRadius={16}
                p={3}
                boxShadow={2}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label='Message'
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            InputLabelProps={{ style: { color: '#004481' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#004481',
                },
                '&:hover fieldset': {
                  borderColor: '#C8102E',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FFD100',
                },
              },
            }}
          />
          <Button 
            variant="contained" 
            onClick={sendMessage} 
            sx={{ 
              bgcolor: '#FFD100', 
              color: '#004481', 
              '&:hover': { 
                bgcolor: '#C8102E',
                color: 'white'
              } 
            }}>
            Send
          </Button>
        </Stack>
      </Stack>

      {/* Popup for Review */}
      <Modal
        open={showPopup}
        onClose={() => setShowPopup(false)}
        aria-labelledby="review-modal-title"
        aria-describedby="review-modal-description"
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'white', 
          border: '2px solid #003B6F', 
          boxShadow: 24, 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3 
        }}>
          <Typography variant="h6" color="#003B6F">
            We Value Your Feedback
          </Typography>
          <Typography variant="body1" color="#003B6F">
            Would you like to leave a review?
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              document.getElementById('review-section').scrollIntoView({ behavior: 'smooth' });
              setShowPopup(false);
            }}
            sx={{ 
              background: '#F9A825', 
              color: '#003B6F', 
              border: 'none', 
              '&:hover': { 
                background: '#F57F17' 
              } 
            }}
          >
            Leave a Review
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

function Reviews() {
  const [feedback, setFeedback] = useState([]);
  const [open, setOpen] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(1); // Added state for rating

  const updateFeedback = async () => {
    const snapshot = query(collection(firestore, 'feedback'));
    const docs = await getDocs(snapshot);
    const feedbackList = [];
    docs.forEach((doc) => {
      feedbackList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setFeedback(feedbackList);
  };

  const addReview = async (review) => {
    const { name, rating } = review; // Destructure review object
  
    // Use the review name as the document ID
    const docRef = doc(collection(firestore, 'feedback'), name);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      // Update the existing document
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1, rating }, { merge: true });
    } else {
      // Create a new document with the review data
      await setDoc(docRef, { quantity: 1, rating });
    }
  
    // Update the feedback list
    await updateFeedback();
  };
  
  useEffect(() => {
    updateFeedback();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      id="review-section"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor= "#F3F4F6" //"#F8F9FA"
      p={4}
    >
      <Typography 
        variant="h2" 
        sx={{ 
          color: '#003B6F', 
          textAlign: 'center', 
          margin: '20px 0',
          textTransform: 'uppercase',
          fontWeight: 'bold'
        }}
      >
        Chatbot Feedback
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'white', 
          border: '2px solid #003B6F', 
          boxShadow: 24, 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3 
        }}>
          <Typography variant="h6" color="#003B6F">
            Add Review
          </Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              id="outlined-basic"
              label="Review"
              variant="outlined"
              fullWidth
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              InputProps={{
                style: { color: '#003B6F' },
              }}
              InputLabelProps={{
                style: { color: '#003B6F' },
              }}
            />
            <Rating
              name="review-rating"
              value={reviewRating}
              onChange={(event, newValue) => setReviewRating(newValue)}
              size="large"
              sx={{ alignSelf: 'center' }}
            />
            <Button
              variant="contained"
              onClick={() => {
                addReview({ name: reviewName, rating: reviewRating }); // Adjusted to include rating
                setReviewName('');
                setReviewRating(1); // Reset rating
                handleClose();
              }}
              sx={{ 
                background: '#F9A825', 
                color: '#003B6F', 
                border: 'none', 
                '&:hover': { 
                  background: '#F57F17' 
                } 
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box width="100%" maxWidth="1200px" mb={2}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
          <Typography variant="h3" color="#003B6F">
            Reviews
          </Typography>
          <Button 
            variant="contained" 
            onClick={handleOpen} 
            sx={{ 
              background: '#F9A825', 
              color: '#003B6F', 
              border: 'none', 
              '&:hover': { 
                background: '#F57F17' 
              } 
            }}
          >
            Add A Review
          </Button>
        </Box>
        <Grid container spacing={2}>
          {feedback.map(({ name, rating }) => (
            <Grid item xs={12} sm={6} md={4} key={name}>
              <Box
                width="100%"
                minHeight="120px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bgcolor='#FFFFFF'
                padding={3}
                border="1px solid #003B6F"
                borderRadius={2}
                boxShadow={2}
              >
                <Typography variant='h4' color="#003B6F" gutterBottom>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Rating
                  name="read-only"
                  value={rating}
                  readOnly
                  size="large"
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

// Main Home Component
export default function Home() {
  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
      <Chatbot />
      <Reviews />
    </Box>
  );
}
