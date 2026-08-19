import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaRobot,
  FaClock,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa";

function AIPredictionCard({ peopleBefore = 0 }) {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPrediction = async () => {
      try {
        setLoading(true);

        const response = await axios.post(
          "http://localhost:5000/api/ai/predict-waiting-time",
          {
            peopleBefore: Number(peopleBefore),
            averageConsultationTime: 10,
            doctorEfficiency: 80,
            emergencyPatients: 0,
          }
        );

        if (response.data.success) {
          setPrediction(response.data.prediction);
        }
      } catch (error) {
        console.error("AI Prediction Error:", error);
        setPrediction(null);
      } finally {
        setLoading(false);
      }
    };

    getPrediction();
  }, [peopleBefore]);

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-3xl shadow-xl p-7">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="bg-white/20 p-4 rounded-2xl">
          <FaRobot className="text-4xl" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            AI Waiting Time Prediction
          </h2>

          <p className="text-blue-100">
            Smart queue prediction
          </p>
        </div>

      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-8 text-center">
          <p className="animate-pulse text-lg">
            🤖 AI is analysing the queue...
          </p>
        </div>
      )}

      {/* Prediction */}
      {!loading && prediction && (
        <div className="mt-7">

          {/* Waiting Time */}
          <div className="bg-white/15 rounded-2xl p-6">

            <div className="flex items-center gap-3">
              <FaClock />

              <span>
                Predicted Waiting Time
              </span>
            </div>

            <h1 className="text-5xl font-bold mt-3">
              {prediction.predictedTime}

              <span className="text-2xl ml-2">
                Minutes
              </span>
            </h1>

          </div>

          {/* Confidence */}
          <div className="bg-white/15 rounded-2xl p-5 mt-5">

            <div className="flex justify-between">

              <span className="flex items-center gap-2">
                <FaChartLine />
                AI Confidence
              </span>

              <span className="font-bold">
                {prediction.confidence}%
              </span>

            </div>

            <div className="w-full bg-white/20 rounded-full h-3 mt-3">

              <div
                className="bg-white h-3 rounded-full transition-all duration-700"
                style={{
                  width: `${prediction.confidence}%`,
                }}
              />

            </div>

          </div>

          {/* AI Information */}
          <div className="flex gap-3 bg-white/10 rounded-xl p-4 mt-5">

            <FaLightbulb className="mt-1 flex-shrink-0" />

            <p className="text-sm">
              AI analyses your queue position,
              consultation time and doctor efficiency
              to estimate your waiting time.
            </p>

          </div>

        </div>
      )}

      {/* Error */}
      {!loading && !prediction && (
        <div className="mt-6 bg-white/10 rounded-xl p-4">
          <p>
            ⚠️ AI prediction is currently unavailable.
          </p>
        </div>
      )}

    </div>
  );
}

export default AIPredictionCard;