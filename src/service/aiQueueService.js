const predictWaitingTime = ({
  peopleBefore,
  averageConsultationTime,
  doctorEfficiency,
  emergencyPatients = 0,
}) => {
  const basicTime =
    peopleBefore * averageConsultationTime;

  let efficiencyFactor = 1;

  if (doctorEfficiency >= 90) {
    efficiencyFactor = 0.8;
  } else if (doctorEfficiency >= 75) {
    efficiencyFactor = 0.9;
  } else if (doctorEfficiency >= 60) {
    efficiencyFactor = 1;
  } else {
    efficiencyFactor = 1.15;
  }

  const emergencyDelay =
    emergencyPatients * 5;

  const predictedTime = Math.max(
    Math.round(
      basicTime * efficiencyFactor +
        emergencyDelay
    ),
    0
  );

  let confidence = 70;

  if (peopleBefore <= 3) {
    confidence = 92;
  } else if (peopleBefore <= 6) {
    confidence = 85;
  } else if (peopleBefore <= 10) {
    confidence = 78;
  }

  return {
    predictedTime,
    confidence,
  };
};

module.exports = {
  predictWaitingTime,
};