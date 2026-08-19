function queueSocket(io) {
  io.on("connection", (socket) => {
    console.log(
      "🟢 Socket connected:",
      socket.id
    );

    // ================================================
    // JOIN QUEUE
    // ================================================

    socket.on("joinQueue", (queueId) => {
      if (!queueId) {
        return;
      }

      socket.join(queueId);

      console.log(
        `👤 ${socket.id} joined queue: ${queueId}`
      );
    });

    // ================================================
    // QUEUE UPDATE
    // ================================================

    socket.on(
      "queueUpdate",
      (queueData) => {
        console.log(
          "📢 Queue update received:",
          queueData
        );

        // Send update to all connected patients
        io.emit(
          "queueUpdated",
          queueData
        );
      }
    );

    // ================================================
    // NEXT PATIENT
    // ================================================

    socket.on(
      "nextPatient",
      (queueData) => {
        console.log(
          "➡️ Next patient:",
          queueData
        );

        io.emit(
          "queueUpdated",
          queueData
        );
      }
    );

    // ================================================
    // CANCEL TOKEN
    // ================================================

    socket.on(
      "cancelToken",
      (queueData) => {
        console.log(
          "❌ Token cancelled:",
          queueData
        );

        io.emit(
          "queueUpdated",
          queueData
        );
      }
    );

    // ================================================
    // DISCONNECT
    // ================================================

    socket.on("disconnect", () => {
      console.log(
        "🔴 Socket disconnected:",
        socket.id
      );
    });
  });
}

module.exports = queueSocket;