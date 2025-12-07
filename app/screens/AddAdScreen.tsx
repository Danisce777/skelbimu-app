
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { MoveLeft } from "lucide-react-native";
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailsField from '../components/DetailsField';
import { Category, useAds } from '../context/AdsContext';

export default function addAdScreen() {
    
    const { ads, addAd } = useAds();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<string[]>([]);
    const [contacts, setContacts] = useState("");
    const [category, setCategory] = useState<Category | "">("");

    const pickImages = async () => {

        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert("Permission required");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync ( {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            selectionLimit: 5,
            quality: 0.8,
        })
        console.log('image picker result:', result);

        if (!result.canceled) {
            const newUris = result.assets.map(a => a.uri);

            setImage(prev => {
            const combined = [...prev, ...newUris];
            const unique = Array.from(new Set(combined));
            
            if (unique.length > 5) {
                alert('Maximum 5 images allowed');
                return unique.slice(0, 5);
            }
            
            return unique;
        });
        }
    }

    const handleAddAd = async () => {

        if(!title || !description || !price || !image || !contacts || !category) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            await addAd({
                title: title,
                description: description,
                price: price,
                image: image,
                contacts: contacts,
                category: category,    
            });
            setTitle("");
            setDescription("");
            setPrice("");
            setImage([]);
            setContacts("");
            setCategory("");

            alert('Ad added!');
        } catch (error) {
            alert('Failed to add ad');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>

            <View style={styles.header}>
                <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
                    <MoveLeft color="black" size={24} />
                </TouchableOpacity>

            <Text style={styles.headerTitle}>Create Ad</Text>
            </View>

                <DetailsField
                placeholder='Enter the name of a product'
                value={title}
                onChangeText={setTitle}
                keyboardType='default'
                />
                <DetailsField
                placeholder='Describe it...'
                value={description}
                onChangeText={setDescription}
                keyboardType='default'
                />
                <DetailsField
                placeholder='Enter the price...'
                value={price}
                onChangeText={setPrice}
                keyboardType='numbers-and-punctuation'
                />
                <DetailsField
                placeholder='Enter your contact information'
                value={contacts}
                onChangeText={setContacts}
                keyboardType='default'
                />

                <Picker
                    selectedValue={category}
                    onValueChange={setCategory}
                >

                    <Picker.Item label='Acoustic Guitars' value={Category.AcousticGuitars} />
                    <Picker.Item label='Amplifiers' value={Category.Amplifiers} />
                    <Picker.Item label='Bass Guitars' value={Category.BassGuitars} />
                    <Picker.Item label='Electric Guitars' value={Category.ElectricGuitars} />
                    <Picker.Item label='Digital Pianos' value={Category.DigitalPianos}/>
                    <Picker.Item label='Drums' value={Category.Drums} />
                    <Picker.Item label='Wind' value={Category.Wind} />
                    <Picker.Item label='Synthesizers' value={Category.Synthesizers} />
                    <Picker.Item label='Other' value={Category.Other} />
                </Picker>

                <View style={{ marginVertical: 10 }}>
                <TouchableOpacity onPress={pickImages}>
                    <Button title="Pick Images" onPress={pickImages} />
                </TouchableOpacity>
                </View>
            
                <Button title="Add Ad" onPress={handleAddAd} />
            </SafeAreaView>
        </ScrollView>
    )
} 


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    placeholder: {
        width: 80,
    },
    goBackButton: {
        padding: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
})