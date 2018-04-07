import Message from '../models/message';

const configureChannels = (socket, user) => {
  socket.on('disconnect', () => {
    console.log(`[INFO] User ${user._id} disconnected!`);
    socket.broadcast.emit('userDisconnect', { user: user._id });
  });

  socket.on('send', (data) => {
    const msg = new Message({
      user: user._id,
      name: user.name,
      time: new Date().getTime(),
      text: data.text,
    });
    msg.save();

    const msgData = {
      msg: {
        ...msg.toObject(),
        name: user.name,
      },
    };

    socket.emit('receive', msgData);
    socket.broadcast.emit('receive', msgData);
  });

  console.log(`[INFO] User ${user._id} connected`);
};

export default configureChannels;
