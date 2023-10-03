import { Text, View, Picker, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { DATA } from "./data";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { SearchArea } from "./ChatBotScopes"

export const Scope2 = () => {

    const navigation = useNavigation()

    const steps = ["Stationary Combustion", "Mobile Combustion", "Fugitive Emissions", "Electricty and gas"];


    const [currentIndex, setCurrentIndex] = useState(0);
    const [pickerOptions, setPickerOptions] = useState(DATA[steps[0]]);

    const [selectedValue, setSelectedValue] = useState();
    const [selectedIndex, setSelectedIndex] = useState();

    const [currentPath, setCurrentPath] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [showChatbot, setShowChatbot] = useState(true);

    const [indexMess, setIndexMess] = useState(0);
    const [messDisplayed, setMessDisplayed] = useState([
        `Welcome to AVA ! I am your virtual assistant.
        I am here to help you fill the forms in order to calculate your carbon footprint.
        You can see on the right 3 boxes. 
        Click on the button "add emission" in one of them.
        Feel free to ask me any question !`,

        `Stationary combustion refers to the controlled burning of fuels in fixed facilities or equipment, typically in industrial settings, to produce heat or energy for various processes or electricity generation.

        Example: A coal-fired power plant that burns coal in a stationary boiler to produce steam, which drives a turbine connected to a generator to produce electricity.`,


        `Mobile combustion involves the combustion of fuels in mobile sources such as vehicles, airplanes, ships, or locomotives to power engines and provide transportation.
         Example: The burning of gasoline in the engine of a car to power it and enable it to move from one location to another.
        `,

        `Fugitive emissions refer to the unintentional release of gases, vapors, or particulate matter into the environment from various industrial processes or equipment, often as a result of leaks or equipment malfunctions
        Example: When a valve in an oil refinery fails and releases a cloud of volatile organic compounds (VOCs) into the atmosphere, these VOCs are considered fugitive emissions because they escape from the intended containment system.
        `,
        ` 
        You can typically find your consumption of electricity and gas by checking your utility bills or by accessing your online utility account. Here's a description of where to find this information, along with an example:

1. Utility Bill:

Electricity: Your electricity consumption is usually listed on your electricity bill. Look for a section that provides details on your electricity usage. It is typically measured in kilowatt-hours (kWh).

Gas: For natural gas consumption, you can find the relevant information on your gas bill. Look for a section that provides details on your gas usage. Gas usage is typically measured in units like therms or cubic feet.
        `,
    ]);
    const [messColor, setMessColor] = useState(['green', 'rgb(70,130,180)', 'rgb(139,69,19)', 'rgb(221,110,110)','rgb(172,172,172)'])

    const [chat, setChat] = useState([{
        "role": "system", "content":
            `You are an environmental assistant.
         You are respectfull and polite.
         Do not say hello.
          Give simple explications.
    `}])

    const [graph, setGraph] = useState({
        "Stationary Combustion": [],
        "Mobile Combustion": [],
        "Fugitive Emissions": [],
        "Electricty and gas": [],
    });



    const HandlePress = (i) => {
        setCurrentIndex(i);
        setIndexMess(i + 1)
        setShowModal(true);
    }

    useEffect(() => {
        setSelectedValue(Object.keys(pickerOptions[0])[0])
        setSelectedIndex(0)
    }, [pickerOptions])

    useEffect(() => {
        setPickerOptions(DATA[steps[currentIndex]]);
        console.log("current index:", currentIndex)
    }, [currentIndex])

    useEffect(() => {
        console.log(graph)
    }, [graph])


    return (
        <View style={{
            padding: 20,
            width: "100vw",
            height: "100vh",
            backgroundColor: "white"
        }}>
            {
                showModal && <Modal
                    steps={steps}

                    currentIndex={currentIndex}

                    setShowModal={setShowModal}

                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}

                    graph={graph}
                    setGraph={setGraph}

                    currentPath={currentPath}
                    setCurrentPath={setCurrentPath}

                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}

                    pickerOptions={pickerOptions}
                    setPickerOptions={setPickerOptions}

                    showInput={showInput}
                    setShowInput={setShowInput}

                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
            }
            {
                showChatbot && <View style={{ position: "absolute", width: '50vw', top: 0, right: 0 }}>
                    <SearchArea chat={chat} setChat={setChat} setShow={setShowChatbot} firstMess={messDisplayed[indexMess]} messColor={messColor[indexMess]} />
                </View>
            }
            {
                showChatbot && <TouchableOpacity onPress={() => setShowChatbot(false)}
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 30,
                        backgroundColor: "green",
                        borderRadius: 10,
                        padding: 10,
                        zIndex: 10
                    }}
                >
                    <Text style={{ fontWeight: "bold", color: "white" }}>Close</Text>
                </TouchableOpacity>
            }
            {!showChatbot && <>
                <TouchableOpacity onPress={() => setShowChatbot(true)}
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 30,
                        backgroundColor: "green",
                        borderRadius: 10,
                        padding: 10,
                        zIndex: 10
                    }}
                >
                    <Text style={{ fontWeight: "bold", color: "white" }}>Looking for help ?</Text>
                </TouchableOpacity>
            </>
            }
            <View style={{ flexDirection: "row" }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: "bold"
                }}>My emissions <Text style={{ color: "darkgray", fontWeight: "400", fontSize: 20 }}>(Scope 1-2)</Text></Text>
                {
                    <TouchableOpacity
                        style={{
                            padding: 10,
                            borderRadius: 10,
                            backgroundColor: "green",
                            marginLeft: 10,
                        }}
                        onPress={() => navigation.navigate("Graphs", { data: graph })}
                    >
                        <Text style={{ color: "white", fontWeight: "bold " }}>Show graphs</Text>
                    </TouchableOpacity>
                }
            </View>
            <View>
                {
                    //graph[steps[0]].length > 0 && (
                    <View style={styles.boxEmission}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 20,
                                marginTop: 10,
                                marginBottom: 10
                            }}>{steps[0]}</Text>
                            <TouchableOpacity onPress={() => HandlePress(0)}
                                style={{
                                    maxWidth: 110,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgb(70,130,180)',
                                    borderRadius: 10,
                                    padding: 10,
                                    zIndex: 10,
                                    maxHeight: 50,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ fontWeight: "bold", color: "white" }}>Add emission</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            {
                                graph[steps[0]].map((obj, i) => {
                                    const key = Object.keys(obj)[0]
                                    const val = Object.values(obj)[0]
                                    return (
                                        <View key={i} style={{
                                            marginLeft: i != 0 ? 10 : 0,
                                            padding: 8,
                                            borderRadius: 10,
                                            shadowColor: "black",
                                            shadowOpacity: 0.5,
                                            shadowRadius: 4,
                                            alignItems: "center"
                                        }}>
                                            <Text style={{ fontWeight: "bold" }}>{key}</Text>
                                            <Text>{Number(val).toFixed(2)}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    //)
                }
                {
                    <View style={styles.boxEmission}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 20,
                                marginTop: 10,
                                marginBottom: 10
                            }}>{steps[1]}</Text>
                            <TouchableOpacity onPress={() => HandlePress(1)}
                                style={{
                                    maxWidth: 110,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgb(139,69,19)',
                                    borderRadius: 10,
                                    padding: 10,
                                    zIndex: 10,
                                    maxHeight: 50,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ fontWeight: "bold", color: "white" }}>Add emission</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            {
                                graph[steps[1]].map((obj, i) => {
                                    const key = Object.keys(obj)[0]
                                    const val = Object.values(obj)[0]
                                    return (
                                        <View key={i} style={{
                                            marginLeft: i != 0 ? 10 : 0,
                                            padding: 8,
                                            borderRadius: 10,
                                            shadowColor: "black",
                                            shadowOpacity: 0.5,
                                            shadowRadius: 4,
                                            alignItems: "center"
                                        }}>
                                            <Text style={{ fontWeight: "bold" }}>{key}</Text>
                                            <Text>{Number(val).toFixed(2)}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    //)
                }
                {
                    //graph[steps[2]].length > 0 && (
                    <View style={styles.boxEmission}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 20,
                                marginTop: 10,
                                marginBottom: 10
                            }}>{steps[2]}</Text>
                            <TouchableOpacity onPress={() => HandlePress(2)}
                                style={{
                                    maxWidth: 110,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgb(221,110,110)',
                                    borderRadius: 10,
                                    padding: 10,
                                    zIndex: 10,
                                    maxHeight: 50,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ fontWeight: "bold", color: "white" }}>Add emission</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{ flexDirection: "row" }}>
                            {
                                graph[steps[2]].map((obj, i) => {
                                    const key = Object.keys(obj)[0]
                                    const val = Object.values(obj)[0]
                                    return (
                                        <View key={i} style={{
                                            marginLeft: i != 0 ? 10 : 0,
                                            padding: 8,
                                            borderRadius: 10,
                                            shadowColor: "black",
                                            shadowOpacity: 0.5,
                                            shadowRadius: 4,
                                            alignItems: "center"
                                        }}>
                                            <Text style={{ fontWeight: "bold" }}>{key}</Text>
                                            <Text>{Number(val).toFixed(2)}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>


                    // )
                }
                {
                    //graph[steps[0]].length > 0 && (
                    <View style={styles.boxEmission}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 20,
                                marginTop: 10,
                                marginBottom: 10
                            }}>{steps[3]}</Text>
                            <TouchableOpacity onPress={() => HandlePress(3)}
                                style={{
                                    maxWidth: 110,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgb(172,172,172)',
                                    borderRadius: 10,
                                    padding: 10,
                                    zIndex: 10,
                                    maxHeight: 50,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ fontWeight: "bold", color: "white" }}>Add emission</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            {
                                graph[steps[3]].map((obj, i) => {
                                    const key = Object.keys(obj)[0]
                                    const val = Object.values(obj)[0]
                                    return (
                                        <View key={i} style={{
                                            marginLeft: i != 0 ? 10 : 0,
                                            padding: 8,
                                            borderRadius: 10,
                                            shadowColor: "black",
                                            shadowOpacity: 0.5,
                                            shadowRadius: 4,
                                            alignItems: "center"
                                        }}>
                                            <Text style={{ fontWeight: "bold" }}>{key}</Text>
                                            <Text>{Number(val).toFixed(2)}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    //)
                }

            </View>
        </View>
    )
}

const Modal = ({
    steps,
    currentIndex,
    setShowModal,
    selectedIndex,
    setSelectedIndex,
    graph,
    setGraph,
    selectedValue,
    setSelectedValue,
    currentPath,
    setCurrentPath,
    pickerOptions,
    setPickerOptions,
    showInput,
    setShowInput,
    inputValue,
    setInputValue
}) => {
    return (
        <View style={{
            right: '8vw',
            position: "absolute",
            zIndex: 1,
            height: "100vh",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <View style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: "white",
                zIndex: 2,
                minWidth: 400,
                shadowColor: "black",
                shadowOpacity: 0.5,
                shadowRadius: 7.5,
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 5 }}>{steps[currentIndex]}</Text>
                    <TouchableOpacity onPress={() => setShowModal(false)}>
                        <Text style={{ padding: 5, fontWeight: "700" }}>X</Text>
                    </TouchableOpacity>
                </View>
                <Picker
                    style={{
                        borderRadius: 5,
                        border: "none",
                        outline: "none",
                        padding: 4,
                        marginVertical: 15,
                        shadowColor: "black",
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        fontSize: 14,
                        fontWeight: "500"
                    }}
                    selectedValue={selectedValue}
                    onValueChange={(item, index) => {
                        setSelectedValue(item);
                        setSelectedIndex(index);
                    }}
                >
                    {
                        pickerOptions.map((option, i) => {
                            return (
                                <Picker.Item
                                    value={Object.keys(option)[0]}
                                    label={Object.values(option)[0]}
                                    key={i}
                                />
                            )
                        })
                    }
                </Picker>
                {
                    showInput &&
                    <TextInput
                        placeholder="Enter a number"
                        placeholderTextColor={"gray"}
                        style={{
                            borderRadius: 5,
                            border: "none",
                            outline: "none",
                            padding: 6,
                            marginBottom: 15,
                            shadowColor: "black",
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            fontSize: 14,
                            fontWeight: "500"
                        }}
                        value={inputValue}
                        onChangeText={(e) => {
                            if (/^\d*\.?\d*$/.test(e)) {
                                setInputValue(e)
                            }
                        }}
                    />
                }
                <TouchableOpacity

                    disabled={inputValue.length == 0 && showInput}

                    style={{
                        opacity: inputValue.length == 0 && showInput ? 0.5 : 1,
                        padding: 10,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "green",
                    }}

                    onPress={() => {
                        const isNextInput = () => {
                            if (Object.keys(DATA[selectedValue][0])[0] == "input") {
                                return true;
                            }

                            return false;
                        }


                        if (showInput) {
                            // last run before adding it                    
                            // add path to the graph
                            
                            const coef = Object.values(DATA[selectedValue][0])[0];
                            console.log("coef: ",coef);
                            console.log("current path", currentPath);
                            console.log("current index: ",currentIndex);
                            console.log("input value:", inputValue);

                            const newArray = [...graph[steps[currentIndex]], { [currentPath]: Number(coef) * Number(inputValue) }];
                            setGraph({ ...graph, [steps[currentIndex]]: newArray });

                            // reset variables                 
                            setPickerOptions(DATA[steps[currentIndex]])
                            setShowModal(false)
                            setCurrentPath("")
                            setInputValue("")
                            return setShowInput(false)
                        } else {
                            if (currentPath.length) {
                                if (!isNaN(selectedValue)) {
                                    // check if the key is a number to put the value in the path (tonnes, kilo, etc...)
                                    setCurrentPath(currentPath + " - " + Object.values(pickerOptions[selectedIndex])[0])
                                } else {
                                    setCurrentPath(currentPath + " - " + selectedValue)
                                }
                            } else {
                                setCurrentPath(selectedValue)
                            }
                        }

                        if (isNextInput()) {
                            setShowInput(true)
                        } else {
                            setPickerOptions(DATA[selectedValue])
                        }
                    }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>{showInput ? "Add" : "Next"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    boxEmission: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
        zIndex: 2,
        minWidth: 100,
        maxWidth: 350,
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 7.5,
        marginVertical: 50,
    },

})