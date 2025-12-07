
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from "expo-router";
import { MoveLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import DetailsField from '../components/DetailsField';
import { Category, useAds } from '../context/AdsContext';



export default function UpdateAdScreen() {


    const { id } = useLocalSearchParams<{ id: string }>();
    const { ads, editAd } = useAds();


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<string[]>([]);
    const [contacts, setContacts] = useState("");
    const [category, setCategory] = useState<Category | "">("");
    const [creatorId, setCreatorId] = useState("");

    useEffect(() => {
        const adToEdit = ads.find(ad => ad.id === id);
        if (adToEdit) {
            setTitle(adToEdit.title);
            setDescription(adToEdit.description);
            setPrice(adToEdit.price);
            setImage(adToEdit.image);
            setContacts(adToEdit.contacts);
            setCategory(adToEdit.category);
            setCreatorId(adToEdit.creatorId);
        }
    }, [id, ads]);


    const handleUpdateAd = async() => {

        if (!title || !description || !price || !contacts || !category) {
            alert('Please fill in all required fields');
            return;
        }

       if (!id) {
            alert('Ad ID not found');
            return;
        }

        try { 
            await editAd(id, {
                title: title,
                description: description,
                price: price,
                image: image,
                contacts: contacts,
                category: category as Category,
                creatorId: creatorId

            })

            alert('Ad Updated!');
            router.back();
        } catch (error) {
            alert('Failed to update ad');
        }
    }

        const pickImages = async () => {
    
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
            if (!permission.granted) {
                Alert.alert('Permission required', 'Permission to access the media library is required.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync ( {
                mediaTypes: ['images', 'videos'],
                allowsMultipleSelection: true,
                allowsEditing: true,
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
                    Alert.alert('Image Limit', 'Maximum 5 images allowed');
                    return unique.slice(0, 5);
                }
                
                return unique;
            });
        }
    }

    return (
        <ScrollView style={styles.container}> 
            <SafeAreaView>

            <View style={styles.header}>
                <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
                    <MoveLeft color="black" size={24} />
                </TouchableOpacity>

            <Text style={styles.headerTitle}>Update Ad</Text>

            </View>

                <DetailsField
                placeholder="Enter Updated Name"
                value={title}
                onChangeText={setTitle}
                keyboardType="default"
                />

                <DetailsField
                placeholder="Enter Updated Description"
                value={description}
                onChangeText={setDescription}
                keyboardType="default"
                />

                <DetailsField
                placeholder="Enter Updated Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numbers-and-punctuation"
                />

                <DetailsField
                placeholder="Enter Updated Contacts"
                value={contacts}
                onChangeText={setContacts}
                keyboardType="default"
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

                <Button title="Update Ad" onPress={handleUpdateAd} />
                <Button title="Cancel" onPress={() => router.back()} color="gray" />

                <Button title="Pick Images" onPress={pickImages} />
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