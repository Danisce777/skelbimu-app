import { router, useLocalSearchParams } from "expo-router";
import { MoveLeft, Pen, X } from "lucide-react-native";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAds } from '../context/AdsContext';
import { useAuthContext } from "../context/AuthContext";

export default function AdDetailsScreen() {

    const { ads, removeAd } = useAds();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { user, isGuest } = useAuthContext();

    const detailedAd = ads.find(ad => ad.id === id);
    
    const isOwner = user && detailedAd && user.uid === detailedAd.creatorId;
 
    const handleDeletion = async () => {
        Alert.alert(
            'Delete Ad',
            'Are you sure you want to delete this ad?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await removeAd(id);
                            Alert.alert('Success', 'Ad has been deleted!');
                            router.back();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete ad');
                        }
                    }
                }
            ]
        );
    };

    if (!detailedAd) {
        return (
            <SafeAreaView>
                <View>
                    <Text>Ad not found</Text>
                </View>
            </SafeAreaView>
        );
    }
    return (
    <ScrollView style={styles.container}>
        <SafeAreaView>

            <View style={styles.header}>
                <TouchableOpacity style={styles.deleteButton} onPress={() => router.push(`/screens/MainScreen`)}>
                    <MoveLeft color="black" size={24} />
                </TouchableOpacity>


                {isOwner ? (
                     <>
                        <TouchableOpacity style={styles.updateButton} onPress={() => router.push(`/screens/UpdateAdScreen?id=${detailedAd.id}`)}>
                            <Pen color="black" size={24} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.deleteButton} onPress={handleDeletion} >
                            <X color="black" size={24} />
                        </TouchableOpacity>
                    </>
                ): (
                    <View style={styles.placeholder} />
                )}

                <Text style={styles.headerTitle}>Detailed Information</Text>

            </View>
            
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{detailedAd.title}</Text>
                <Text style={styles.price}>€{detailedAd.price}</Text>
                <Text style={styles.description}>{detailedAd.description}</Text>
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText} >{detailedAd.category} </Text>
                </View>
                <Text style={styles.contacts}>{detailedAd.contacts}</Text>
            </View>

            <View style={styles.imageGallery}>
                {detailedAd.image.map((imgUri, index) => (
                    <Image 
                        key={index}
                        source={{ uri: imgUri }}
                        style={ styles.image}
                        resizeMode="contain"
                    />
                ))}
            </View>
        </SafeAreaView>
     </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageGallery: {
        height: 300,
    },
    image: {
        width: Dimensions.get('window').width,
        height: 300,
    },
    infoContainer: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#22c55e',
        marginBottom: 16,
    },
    categoryBadge: {
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    categoryText: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: '600',
    },
    description: {
        fontSize: 15,
        color: '#666',
        lineHeight: 22,
    },
    contacts: {
        fontSize: 15,
        color: '#2563eb',
        fontWeight: '500',
    },
    updateButton: {
        padding: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    deleteButton: {
        padding: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    placeholder: {
        width: 80,
    }
});