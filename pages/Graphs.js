import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, useWindowDimensions } from "react-native"
import { PieChart } from "react-native-chart-kit";
import { useNavigation, useRoute } from '@react-navigation/native';

export const Graphs = () => {

    const steps = ["Stationary Combustion", "Mobile Combustion", "Fugitive Emissions", "Electricty and gas"];
    const route = useRoute();
    const data = route.params?.data;
    console.log("data: ",data);
    console.log("data step 3,", data[steps[3]]);

    const [graph1, setGraph1] = useState([]);
    const [graph2, setGraph2] = useState([]);
    const [graph3, setGraph3] = useState([]);
    const [graph4, setGraph4] = useState([]);
    const [graph5, setGraph5] = useState([]);
    const [nextProps, setNextProps] = useState([]);

    useEffect(() => {

        var graph1Total = 0
        var graph2Total = 0
        var graph3Total = 0
        var graph5Total = 0

        for (let i = 0; i < data[steps[0]].length; i++) {
            var el = data[steps[0]][i]
            var val = Object.values(el)[0]
            graph1Total += val
        }
        for (let i = 0; i < data[steps[1]].length; i++) {
            var el = data[steps[1]][i]
            var val = Object.values(el)[0]
            graph2Total += val
        }
        for (let i = 0; i < data[steps[2]].length; i++) {
            var el = data[steps[2]][i]
            var val = Object.values(el)[0]
            graph3Total += val
        }
        for (let i = 0; i < data[steps[3]].length; i++) {
            var el = data[steps[3]][i]
            var val = Object.values(el)[0]
            graph5Total += val
        }

        var graph1temp = []
        var graph2temp = []
        var graph3temp = []
        var graph5temp = []

        for (let i = 0; i < data[steps[0]].length; i++) {
            var el = data[steps[0]][i]
            var key = Object.keys(el)[0]
            var val = Object.values(el)[0]
            graph1temp.push({
                name: "% | " + key,
                emission: Number(Number(val / graph1Total * 100).toFixed(2)),
                color: `rgba(0, 220, 0, ${1 / (i + 1)})`,
            })
        }
        for (let i = 0; i < data[steps[1]].length; i++) {
            var el = data[steps[1]][i]
            var key = Object.keys(el)[0]
            var val = Object.values(el)[0]
            graph2temp.push({
                name: "% | " + key,
                emission: Number(Number(val / graph2Total * 100).toFixed(2)),
                color: `rgba(0, 220, 0, ${1 / (i + 1)})`,
            })
        }
        for (let i = 0; i < data[steps[3]].length; i++) {
            var el = data[steps[3]][i]
            var key = Object.keys(el)[0]
            var val = Object.values(el)[0]
            graph5temp.push({
                name: "% | " + key,
                emission: Number(Number(val / graph5Total * 100).toFixed(2)),
                color: `rgba(0, 220, 0, ${1 / (i + 1)})`,
            })
        }
        for (let i = 0; i < data[steps[2]].length; i++) {
            var el = data[steps[2]][i]
            var key = Object.keys(el)[0]
            var val = Object.values(el)[0]
            graph3temp.push({
                name: "% | " + key,
                emission: Number(Number(val / graph3Total * 100).toFixed(2)),
                color: `rgba(0, 220, 0, ${1 / (i + 1)})`,
            })
        }

        const graph4Total = graph1Total + graph2Total + graph3Total + graph5Total

        var graph4temp = []
        setNextProps([
            { "Stationary Combustion": Number(graph1Total / graph4Total * 100).toFixed(2) },
            { "Mobile Combustion": Number(graph2Total / graph4Total * 100).toFixed(2) },
            { "Fugitive Emission": Number(graph3Total / graph4Total * 100).toFixed(2) },
            { "Electricty and gas": Number(graph5Total / graph4Total * 100).toFixed(2) },
        ])
        graph4temp.push({
            name: "% | " + "Stationary Combustion",
            emission: Number(Number(graph1Total / graph4Total * 100).toFixed(2)),
            color: "rgba(0,220,0,1)",
        })
        graph4temp.push({
            name: "% | " + "Mobile Combustion",
            emission: Number(Number(graph2Total / graph4Total * 100).toFixed(2)),
            color: "rgba(0,220,0,0.66)",
        })
        graph4temp.push({
            name: "% | " + "Fugitive Emission",
            emission: Number(Number(graph3Total / graph4Total * 100).toFixed(2)),
            color: "rgba(0,220,0,0.33)",
        })
        graph4temp.push({
            name: "% | " + "Electricity and gas",
            emission: Number(Number(graph5Total / graph4Total * 100).toFixed(2)),
            color: "rgba(0,220,0,0.33)",
        })

        setGraph1(graph1temp)
        setGraph2(graph2temp)
        setGraph3(graph3temp)
        setGraph5(graph5temp)
        setGraph4(graph4temp)
    }, [])

    const chartConfig = {
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3        
    };

    const { width } = useWindowDimensions()
    const navigation = useNavigation()

    return (
        <View style={{ padding: 20, width: "100vw", backgroundColor: "white" }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Stationary Combustion</Text>
            <PieChart
                avoidFalseZero
                data={graph1}
                width={width - 40}
                height={400}
                chartConfig={chartConfig}
                accessor={"emission"}
                backgroundColor={"transparent"}
                absolute
            />
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Mobile Combustion</Text>
            <PieChart
                avoidFalseZero
                data={graph2}
                width={width - 40}
                height={400}
                chartConfig={chartConfig}
                accessor={"emission"}
                backgroundColor={"transparent"}
                absolute
            />
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Fugitive Emissions</Text>
            <PieChart
                avoidFalseZero
                data={graph3}
                width={width - 40}
                height={400}
                chartConfig={chartConfig}
                accessor={"emission"}
                backgroundColor={"transparent"}
                absolute
            />
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Electricity and gas</Text>
            <PieChart
                avoidFalseZero
                data={graph5}
                width={width - 40}
                height={400}
                chartConfig={chartConfig}
                accessor={"emission"}
                backgroundColor={"transparent"}
                absolute
            />
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Global Emissions</Text>
            <PieChart
                avoidFalseZero
                data={graph4}
                width={width - 40}
                height={400}
                chartConfig={chartConfig}
                accessor={"emission"}
                backgroundColor={"transparent"}
                absolute
            />
            <TouchableOpacity
                onPress={() => navigation.navigate("AdditionalQuest", { data: nextProps })}
                style={{
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "green",
                    marginTop: 10
                }}
            >
                <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Reduce my emissions</Text>
            </TouchableOpacity>
        </View>
    )
}