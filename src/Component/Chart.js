import React, { useEffect, useState } from 'react'
import BarChart from "react-bar-chart";

function Chart({data}) {

  const [charData, setChartData] = useState([])

  const getPercentage = (barValue) => {
    return Math.round((barValue / data.length) * 100)
  }

  useEffect(() => {
    const barOne = data.filter((item) => item.track > 0 && item.track <= 30)
    const barTwo = data.filter((item) => item.track > 30 && item.track <= 60)
    const barThree = data.filter((item) => item.track > 60 && item.track <= 90)
    const barFour = data.filter((item) => item.track > 90 && item.track <= 100)

    setChartData([
      { text: "(0 - 30)%", value: getPercentage(barOne.length)  },
      { text: "(30 - 60)%", value: getPercentage(barTwo.length) },
      { text: "(60 - 90)%", value: getPercentage(barThree.length) },
      { text: "(90 - 100)%", value: getPercentage(barFour.length) }
    ])

  }, [])

  const color = { color: "blue" };

  const margin = { top: 20, right: 20, bottom: 30, left: 50 };

  return (
      <div style={{ width: "40%", marginLeft : "20px" }}>
        <BarChart
          ylabel="User percentge"
          xlabel="Reading Percentage"
          width={600}
          height={500}
          margin={margin}
          data={charData}
          color={color}
        />
      </div>
  )
}

export default Chart