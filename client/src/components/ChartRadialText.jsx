/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable consistent-return */

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartContainer } from "./ui/chart.tsx";

const chartData = [{ browser: "safari", visitors: 9, fill: "rgb(251 191 36)" }];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
  },
};

const sizes = {
  small: {
    containerSize: "h-[100px] w-[100px]",
    innerRadius: 30,
    outerRadius: 45,
    fontSize: "text-base",
    labelSize: "text-[10px]",
  },
  medium: {
    containerSize: "h-[150px] w-[150px]",
    innerRadius: 50,
    outerRadius: 70,
    fontSize: "text-2xl",
    labelSize: "text-xs",
  },
  large: {
    containerSize: "h-[200px] w-[200px]",
    innerRadius: 70,
    outerRadius: 95,
    fontSize: "text-3xl",
    labelSize: "text-sm",
  },
};

function ChartRadialText({ size = "small", className = "" }) {
  const { containerSize, innerRadius, outerRadius, fontSize, labelSize } =
    sizes[size];

  return (
    <ChartContainer
      config={chartConfig}
      className={`aspect-square ${containerSize} ${className}`}
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={250}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[innerRadius + 4, innerRadius - 4]}
        />
        <RadialBar dataKey="visitors" background cornerRadius={8} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className={`fill-foreground font-bold ${fontSize}`}
                    >
                      {chartData[0].visitors.toLocaleString()}
                    </tspan>
                    {/* <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + (size === 'small' ? 12 : 16)}
                      className={`fill-muted-foreground ${labelSize}`}
                    >
                      Estudiantes
                    </tspan> */}
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}

export default ChartRadialText;
