import {
  Dimensions,
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { fallbackMoviePoster, fetchPersonDetails, image342 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const verticalMargin = ios ? "" : "mt-3";

export default function PersonScreen() {
  const {params: item} = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [personMovies, setPersonMovies] = useState({});
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(()=> {
    setLoading(true);
    getPersonDetails(item.id);
  }, [item])


  const getPersonDetails = async id=>{
    const data = await fetchPersonDetails(id);
    if(data) setPerson(data);
    setLoading(false);
  }

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button */}

      <SafeAreaView
        className={
          " z-20 w-full flex-row justify-between items-center px-4" +
          verticalMargin
        }
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1"
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon
            size="35"
            color={isFavourite ? theme.background : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <View
            className=" flex-col justify-center items-center"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
              <Image
                //source={require("../../assets/image/kaun.jpg")}
                source={{uri: image342(person?.profile_path) || fallbackMoviePoster}}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          <View className="mt-6 ">
            <Text className="text-3xl text-white font-bold text-center">
              {
                person?.name
              }
            </Text>
            <Text className="text-base text-neutral-500 font-bold text-center">
              {
                person?.place_of_birth
              }
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6  flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">{person?.gender==1? 'Female': 'Male'}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">{person?.birthday}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">Acting</Text>
            </View>
            <View className=" px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">64.23</Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              Keanu Reeves (born September 2, 1964, Beirut, Lebanon) Canadian
              actor who found his greatest success in comedy, science-fiction,
              and action movies. Reeves’s mother was an English performer and
              costume designer, and his father was a Hawaiian geologist. They
              divorced when he was a young child, and he lived with his mother.
              The family moved first to Sydney, then to New York City, and
              finally to Toronto, where Reeves grew up. He struggled in school
              and attended four different high schools, one of which was focused
              on the arts, before leaving to pursue an acting career. His first
              professional appearance was in a 1984 episode of the comedy series
              Hangin’ In. Following more roles in TV movies and shows, Reeves
              made his film debut as a hockey player in Youngblood (1986), set
              in the world of junior hockey in Canada. Later that year he gained
              notice for his portrayal of a disaffected teen in the bleak drama
              River’s Edge and as the son of an alcoholic father (Andy Griffith)
              in the TV movie Under the Influence. Reeves appeared in several
              movies over the next two years, most prominently Dangerous
              Liaisons (1988), before starring in the slacker comedy Bill &
              Ted’s Excellent Adventure (1989), about two high-school students
              who time-travel for a history project. The movie was an unexpected
              and enduring hit. Later in 1989 Reeves also acted in Ron Howard’s
              Parenthood.
            </Text>
          </View>
          {/* movies */}
          {/* <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} /> */}
        </>
      )}
    </ScrollView>
  );
}
