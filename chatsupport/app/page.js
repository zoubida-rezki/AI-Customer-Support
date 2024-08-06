'use client'
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Assistant } from "next/font/google";
import { useState } from "react";
export default function Home() {
  const [messages , setMessages] = useState([
    {role:'assistant', content: 'Hello! Welcome to Southwest Airlines customer support. How can I assist you today?'}
  ])

  const sendMessage = async()=>{
    setMessage('')
    setMessages((messages) => [...messages, {role: 'user', content:message },{role:'assistant', content:'' }])
    const response = await fetch ( '/api/chat', {
      method: 'POST',
      header:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify([...messages, {role: 'user', content: message}])
    }).then(async(res)=>{
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let result =''
      return reader.read().then(function processText({done,value}){
        if(done){
          return result
        }
        
        const text=decoder.decode(value || new Uint8Array(),{stream:true})
        setMessages((messages)=>{
          let lastMessage =messages[messages.length-1]
          let otherMessages= messages.slice(0, messages.length-1)
          return [...otherMessages, {...lastMessage, content: lastMessage.content + text}]
        })
        return reader.read().then(processText)
      })
    })
    // const data = await response.json()
    // setMessages((messages) => [...messages, {role: 'assistant', content: data.message}])
  }

  const [message , setMessage] = useState('')
  return (
   <Box
   width="100vw"
   height='100vh'
   display='flex'
   flexDirection='column'
   justifyContent='center'
   alignItems='center'
   >
    <Stack direction={'column'} width='500px' height='500px' border='1px solid black' p={2} spacing={3}>
    <Stack direction={'column'} spacing={2} flexGrow={1} overflow='auto' maxHeight='100%'>
      {
        messages.map((message,index) => (
          <Box
          key={index}
          display="flex"
          justifyContent={message.role === 'assistant'? 'flex-start': 'flex-end'}
          >
            <Box
            bgcolor={message.role === 'assistant'? 'primary.main': 'black'}
            color='white'
            borderRadius={16}
            p={3}
            >
                {message.content}
            </Box>
          </Box>
        ))
      }
      </Stack>
      <Stack direction={'row'} spacing={2} >
        <TextField label='Message' fullWidth value={message} onChange={(e)=> setMessage(e.target.value)} />
        <Button variant="contained" onClick={sendMessage}>send</Button>
      </Stack>
    </Stack>
   </Box>
  );
}
