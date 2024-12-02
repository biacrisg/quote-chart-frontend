"use client";
import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import dynamic from "next/dynamic";
import Header from "../Header/Header";

const HighchartsReact = dynamic(() => import("highcharts-react-official"), {
  ssr: false,
});

const Chart = () => {
  const [currency, setCurrency] = useState<string>("USD-BRL");
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Adicionar estado de loading

  const currencies = [
    { code: "USD-BRL", label: "BRL- Dólar (USD)" },
    { code: "EUR-BRL", label: "BRL- Euro (EUR)" },
    { code: "ARS-BRL", label: "BRL- Pesos Argentinos (ARS)" },
  ];

  const fetchCurrencyData = async (currencyCode: string, days: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://chart-app-currency-new-1cf60e87e39e.herokuapp.com/v1/quote",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Currency: currencyCode,
            Days: days.toString(),
          },
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao buscar dados");
      }

      const data = await res.json();

      const groupedData = data.reduce((acc: any, entry: any) => {
        const date = new Date(entry.timestamp * 1000);
        const formattedDate = date.toLocaleDateString();

        if (!acc[formattedDate]) {
          acc[formattedDate] = {
            date: formattedDate,
            high: parseFloat(entry.high),
            low: parseFloat(entry.low),
          };
        } else {
          acc[formattedDate].high = Math.max(
            acc[formattedDate].high,
            parseFloat(entry.high)
          );
          acc[formattedDate].low = Math.min(
            acc[formattedDate].low,
            parseFloat(entry.low)
          );
        }

        return acc;
      }, {});

      const formattedData = Object.values(groupedData);
      formattedData.sort(
        (a: any, b: any) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setChartData(formattedData);
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencyData(currency, 7);
  }, [currency]);

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Gráfico de cotações",
    },
    xAxis: {
      categories: chartData.map((entry: any) => entry.date),
    },
    series: [
      {
        name: "Máximo",
        data: chartData.map((entry: any) => entry.high),
      },
      {
        name: "Mínimo",
        data: chartData.map((entry: any) => entry.low),
      },
    ],
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto mt-20 p-5">
        <div className="mb-5 flex gap-4 justify-center">
          {currencies.map((currencyItem) => (
            <button
              key={currencyItem.code}
              onClick={() => setCurrency(currencyItem.code)}
              className="btn btn-primary"
              disabled={loading}
            >
              {currencyItem.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center mt-4 text-xl text-gray-700">
            Carregando dados, por favor aguarde...
          </div>
        )}

        <div className="bg-white p-10 rounded-lg max-w-full mx-auto flex justify-center items-center flex-col gap-3">
          {!loading && chartData.length > 0 ? (
            <HighchartsReact highcharts={Highcharts} options={options} />
          ) : (
            !loading && (
              <div className="text-center mt-4 text-gray-700">
                Nenhum dado disponível para exibir.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
