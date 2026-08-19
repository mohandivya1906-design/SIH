// =====================================================
// AI QUEUE PREDICTION SERVICE
// =====================================================

const predictWaitingTime = ({
  peopleBefore,
  averageConsultationTime,
  doctorEfficiency,
  emergencyPatients = 0,
}) => {

  // -----------------------------------------------
  // BASIC WAITING TIME
  // -----------------------------------------------

  const basicTime =
    peopleBefore *
    averageConsultationTime;


  // -----------------------------------------------
  // DOCTOR EFFICIENCY
  // -----------------------------------------------

  let efficiencyFactor = 1;

  if (doctorEfficiency >= 90) {
    efficiencyFactor = 0.80;
  } else if (doctorEfficiency >= 75) {
    efficiencyFactor = 0.90;
  } else if (doctorEfficiency >= 60) {
    efficiencyFactor = 1.00;
  } else {
    efficiencyFactor = 1.15;
  }


  // -----------------------------------------------
  // EMERGENCY PATIENT FACTOR
  // -----------------------------------------------

  const emergencyDelay =
    emergencyPatients * 5;


  // -----------------------------------------------
  // AI PREDICTED TIME
  // -----------------------------------------------

  let predictedTime =
    basicTime *
    efficiencyFactor;

  predictedTime += emergencyDelay;


  // -----------------------------------------------
  // ROUND RESULT
  // -----------------------------------------------

  predictedTime =
    Math.max(
      Math.round(predictedTime),
      0
    );


  // -----------------------------------------------
  // CONFIDENCE
  // -----------------------------------------------

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
    factors: {
      peopleBefore,
      averageConsultationTime,
      doctorEfficiency,
      emergencyPatients,
    },
  };
};


module.exports = {
  predictWaitingTime,
};