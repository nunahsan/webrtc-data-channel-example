# webrtc-data-channel-example
sample for webrtc datachannel

How to run server.js
-------------------------
1. must have nodejs installed

2. must have npm installed

3. must install socket.io => npm install socket.io --save

4. run => node server.js

How to run client.html
-------------------------
1. Edit client.html, replace ws://localhost:5000 to your desired server url and port.

2. Open url : 
      http://yourdomain/client.html#username=user1 AND
      http://yourdomain/client.html#username=user2
      
3. Click "connect to socket" button on both pages

4. As user1, click "start stun" button.

5. Try sending message by entering text in textbox and click send button.
