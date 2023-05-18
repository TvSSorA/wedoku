<script lang="ts">
    import { goto } from "$app/navigation";
	import { db } from "$lib/firebase/app";
	import { userCred } from "$lib/firebase/user";
    import { Title } from "@svelteuidev/core";
	import { setDoc, doc } from "firebase/firestore";

    let roomId = String(Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000))

    $: if ($userCred) {
        function createRoom(roomID: string) {
            setDoc(doc(db, "rooms", roomID), {
                started: false,
                difficulty: "easy",
                blue: {
                    info: {
                        uid: null,
                        name: null,
                        avatar: null
                    },
                    owner: false
                },
                red: {
                    info: {
                        uid: null,
                        name: null,
                        avatar: null
                    },
                    owner: false
                }
            });
        }

        createRoom(roomId);
        goto(`/multi/${roomId}`);
    }
</script>

<Title order={3} align="center" override={{ marginTop: "20rem" }}>Hang in tight while we do the magics~~</Title>