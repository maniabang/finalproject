import React, { useState } from 'react';
import { StyleSheet, 
        View, Text, SafeAreaView, 
        TouchableOpacity, FlatList, Image} 
from 'react-native';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { selectTravelTimeInformation } from '../slices/navSlice';
import Intl from 'intl';
import 'intl/locale-data/jsonp/en-GB';

const data =[
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {

    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("NavigateCard")} 
                    style={tw`absolute top-3 left-5 p-3 rounded-full`}
                >
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>
                    Select a Ride - {travelTimeInformation?.distance.text}
                </Text>
            </View>

            <FlatList 
                data={data} 
                keyExtractor={(item) => item.id} 
                renderItem={({item: {id, title, multiplier, image}, item})=>(
                    <TouchableOpacity
                        onPress={() => setSelected(item)} 
                        style={tw`flex-row justify-between items-center px-10 ${
                            id === selected?.id && "bg-gray-200"
                        }`}
                    >
                        <Image 
                            style={{
                                width: 80,
                                height: 80,
                                resizeMode: "contain",
                            }}
                            source={{ uri: image }}
                        />
                        <View>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {new Intl.NumberFormat(['en-GB'], {
                                style: 'currency',
                                currency: 'GBP',
                            }).format(
                                ((travelTimeInformation?.duration?.value * 
                                SURGE_CHARGE_RATE * multiplier) * 100) ? 
                                (travelTimeInformation?.duration?.value * 
                                SURGE_CHARGE_RATE * multiplier) * 100 : 0
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity 
                disabled={!selected} 
                style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
                >
                    <Text style={tw`text-center text-white text-xl`}>
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RideOptionsCard

const styles = StyleSheet.create({})