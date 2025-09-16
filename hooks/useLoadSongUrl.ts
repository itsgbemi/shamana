import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Song } from "@/types"

const useLoadSongUrl = (song: Song) => {
    const supabaseClient = useSupabaseClient()

    if (!song) return '';

    // Handle case where song_path might be undefined
    if (!song.song_path) return '';

    const { data: songData } = supabaseClient
        .storage
        .from('pli5t-songs')
        .getPublicUrl(song.song_path);

    return songData.publicUrl || '';
}

export default useLoadSongUrl