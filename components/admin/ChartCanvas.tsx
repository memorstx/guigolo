"use client";

import { useEffect, useRef } from "react";

type ChartKind = "line" | "bar" | "doughnut";

type Dataset = {
  label: string;
  data: number[];
};

type ChartInstance = {
  destroy: () => void;
};

type ChartConstructor = new (
  context: CanvasRenderingContext2D,
  config: Record<string, unknown>
) => ChartInstance;

declare global {
  interface Window {
    Chart?: ChartConstructor;
    __guigoloChartJsPromise?: Promise<void>;
  }
}

const CHART_JS_URL =
  "https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js";

const palette = ["#BCA7FF", "#67E8F9", "#C6FF00", "#F0ABFC", "#A3A3A3", "#FDE68A"];

function loadChartJs() {
  if (window.Chart) return Promise.resolve();
  if (window.__guigoloChartJsPromise) return window.__guigoloChartJsPromise;

  window.__guigoloChartJsPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById("guigolo-chartjs") as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Chart.js failed to load.")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.id = "guigolo-chartjs";
    script.src = CHART_JS_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Chart.js failed to load."));
    document.head.appendChild(script);
  });

  return window.__guigoloChartJsPromise;
}

export default function ChartCanvas({
  type,
  labels,
  datasets,
  horizontal = false,
  height = 260,
  legend = true,
}: {
  type: ChartKind;
  labels: string[];
  datasets: Dataset[];
  horizontal?: boolean;
  height?: number;
  legend?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let active = true;
    let instance: ChartInstance | null = null;

    loadChartJs()
      .then(() => {
        if (!active || !canvasRef.current || !window.Chart) return;

        const context = canvasRef.current.getContext("2d");
        if (!context) return;

        const chartDatasets = datasets.map((dataset, index) => {
          const color = palette[index % palette.length];

          if (type === "line") {
            return {
              ...dataset,
              borderColor: color,
              backgroundColor: color,
              borderWidth: 2,
              pointRadius: 2,
              pointHoverRadius: 4,
              tension: 0.35,
              fill: false,
            };
          }

          if (type === "doughnut") {
            return {
              ...dataset,
              backgroundColor: dataset.data.map(
                (_, itemIndex) => palette[itemIndex % palette.length]
              ),
              borderColor: "#111113",
              borderWidth: 3,
              hoverOffset: 4,
            };
          }

          return {
            ...dataset,
            backgroundColor: color,
            borderRadius: 7,
            borderSkipped: false,
          };
        });

        const scales =
          type === "doughnut"
            ? undefined
            : {
                x: {
                  grid: {
                    color: horizontal ? "rgba(255,255,255,0.06)" : "transparent",
                  },
                  border: { display: false },
                  ticks: {
                    color: "#737373",
                    font: { size: 10 },
                  },
                },
                y: {
                  beginAtZero: true,
                  grid: {
                    color: horizontal ? "transparent" : "rgba(255,255,255,0.06)",
                  },
                  border: { display: false },
                  ticks: {
                    color: "#737373",
                    font: { size: 10 },
                    precision: 0,
                  },
                },
              };

        instance = new window.Chart(context, {
          type,
          data: {
            labels,
            datasets: chartDatasets,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: horizontal ? "y" : "x",
            animation: { duration: 260 },
            cutout: type === "doughnut" ? "72%" : undefined,
            plugins: {
              legend: {
                display: legend,
                position: "bottom",
                labels: {
                  color: "#A3A3A3",
                  boxWidth: 10,
                  boxHeight: 10,
                  usePointStyle: true,
                  padding: 18,
                  font: { size: 10 },
                },
              },
              tooltip: {
                backgroundColor: "#17171A",
                borderColor: "rgba(255,255,255,0.12)",
                borderWidth: 1,
                titleColor: "#F5F5F5",
                bodyColor: "#D4D4D4",
                padding: 10,
                displayColors: true,
              },
            },
            scales,
          },
        });
      })
      .catch(() => undefined);

    return () => {
      active = false;
      instance?.destroy();
    };
  }, [datasets, height, horizontal, labels, legend, type]);

  return (
    <div style={{ height }} className="mt-5 w-full">
      <canvas ref={canvasRef} />
    </div>
  );
}
