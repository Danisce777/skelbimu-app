
import { router } from "expo-router";
import { ListFilter, Plus } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Category, useAds } from '../context/AdsContext';
import { useAuthContext } from "../context/AuthContext";

const { width } = Dimensions.get("window");

export default function MainScreen() {

    const { ads, addAd } = useAds();
    const { user, isGuest } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [searchedCategory, setSearchedCategory] = useState<Category | null>(null);
    const [showSidebar, setShowSidebar] = useState(false);

    const displayedAds = searchedCategory 
    ? ads.filter(ad => ad.category ===  searchedCategory) 
    : ads;

    const handleAddAdPress = () => {
        if (user && !isGuest) {
            router.push("/screens/AddAdScreen");
        } else {
            Alert.alert(
                "Login Required",
                "You need to login to post ads",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Login", onPress: () => router.push("/screens/LoginScreen") },
                ]
            );
        }
    };

    if(loading){
        return(
            <View>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>Loading ads...</Text>
            </View>
        )
    }
    
    return (
        <SafeAreaView style= {styles.container} >

        <View style={styles.header}>
            <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setShowSidebar(prev => !prev)}
            >
                <ListFilter size={24} color="black" />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>Marketplace</Text>
            
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={handleAddAdPress}
            >
                <Plus color="black" size={24} />
            </TouchableOpacity>
        </View>

            {showSidebar && (
                <View style={styles.categoriesList}>
                    <TouchableOpacity
                    onPress={() => {
                        setSearchedCategory(null);
                        setShowSidebar(false);
                    }}
                    >
                    <Text style={styles.categoriesListText}>All</Text>
                    </TouchableOpacity>

                    {(Object.values(Category) as Category[]).map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        onPress={() => {
                        setSearchedCategory(cat);
                        setShowSidebar(false);
                        }}
                    >
                        <Text style={styles.categoriesListText}>{cat}</Text>
                    </TouchableOpacity>
                    ))}
                </View>
            )}

            <ScrollView contentContainerStyle={styles.scrollContent}>

            {displayedAds.length === 0 ? (
                <View style={styles.emptyContainer}>
                <Text> No ads yet. Add your first ad!</Text>
                </View>
            ) : (
                <View style={styles.adGrid}>
                    {displayedAds.map( (ad) => (
                        <View style={styles.imgCard} key={ad.id}>

                        <TouchableOpacity 
                            onPress={() => router.push(`/screens/AdDetailsScreen?id=${ad.id}`)}
                        >
                        {ad.image && ad.image.length > 0 && (
                            <Image 
                                style= {styles.imageStyles}
                                source={{ uri: ad.image[0] }} 
                                resizeMode="cover"
                            />                        
                        )}
                        <Text style={styles.adTitle}>{ad.title}</Text>
                        <Text style={styles.adTitle}>€{ad.price}</Text>
                        </TouchableOpacity>
                    </View>
                    ))}
                </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}                

const styles = StyleSheet.create({

    container: {
        flex: 1, 
    },
    scrollContent: {
        paddingTop: 60,
        paddingBottom: 20,
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
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    filterButton: {
        padding: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    addButton: {
        padding: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
    },
    imageStyles: {
        width: '100%',
        aspectRatio: 1,
        height: 150,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    adTitle: {
        fontWeight: "600",
        fontSize: 17,
        padding: 4,
        color: "black",
        flexWrap: 'wrap',
    },
    imgCard: {
        padding: 8,
        margin: 4,
        width: (width - 56) / 2,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    adGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    categoriesListText: {
        fontSize: 20,
        fontWeight: 600,
        borderColor: "black",
        paddingVertical: 8,
    },
    categoriesList: {
        backgroundColor: '#fff',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
})

MainScreen.options = {
  headerTitle: "My Marketplace"
};