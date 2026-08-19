const express = require("express");

const {
  predictWaitingTime,
} = require("../services/aiQueueService");

const router = express.Router();


// =====================================================
// AI WAITING TIME PREDICTION
// =====================================================

router.post(
  "/predict-waiting-time",
  (req, res) => {

    try {

      const {
        peopleBefore,
        averageConsultationTime,
        doctorEfficiency,
        emergencyPatients,
      } = req.body;


      // -----------------------------------------------
      // VALIDATION
      // -----------------------------------------------

      if (
        peopleBefore === undefined ||
        averageConsultationTime === undefined ||
        doctorEfficiency === undefined
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Required prediction data missing",
        });

      }


      // -----------------------------------------------
      // AI PREDICTION
      // -----------------------------------------------

      const prediction =
        predictWaitingTime({

          peopleBefore:
            Number(peopleBefore),

          averageConsultationTime:
            Number(
              averageConsultationTime
            ),

          doctorEfficiency:
            Number(
              doctorEfficiency
            ),

          emergencyPatients:
            Number(
              emergencyPatients || 0
            ),
        });


      // -----------------------------------------------
      // RESPONSE
      // -----------------------------------------------

      return res.json({

        success: true,

        message:
          "AI waiting time predicted successfully",

        prediction,

      });

    } catch (error) {

      console.error(
        "AI Prediction Error:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "AI prediction failed",

      });

    }

  }
);


module.exports = router;