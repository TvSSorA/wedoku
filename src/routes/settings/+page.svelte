<script lang="ts">
    import { Title, Text, TextInput, Button, Switch } from "@svelteuidev/core";
    import { userCred, userData } from "$lib/firebase/user";
	import { db } from "$lib/firebase/app";
	import { updateProfile } from "firebase/auth";
	import { updateDoc, doc } from "firebase/firestore";
</script>

<div class="settings-wrapper">
    <Title align="center" size={50} variant='gradient' gradient={{from: 'pink', to: 'grape', deg: 45}}>Settings</Title>

    <div class="settings">
        <div class="game-name">
            <div class="left">
                <div class="category">
                    <Title size={20} align="right">In-game name</Title>
                </div>
            </div>
            <div class="right">
                <div class="setting">
                    <Text>Change username</Text>
                    <TextInput id="name-input" pattern="[a-zA-Z0-9]+" placeholder="New username" override={{ input: { color: "$dark50 !important" }  }} />
                    <Button
                        on:click={() => 
                            {if ($userCred) { 
                                updateProfile($userCred, { displayName: "SorA" }) 
                            }}} 
                        type="submit"
                        variant="gradient" 
                        gradient={{ from: 'grape', to: 'pink', deg: 35 }}
                    >
                        Change
                    </Button>
                </div>
            </div>
        </div>

        <div class="online-status">
            <div class="left">
                <div class="category">
                    <Title size={20} align="right">Online Status</Title>
                </div>
            </div>
            <div class="right">
                <div class="setting">
                    <Text>Show online status</Text>
                    <Switch 
                        on:click={() => 
                            {if ($userCred && $userData) { 
                                updateDoc(doc(db, "users", $userCred.uid), { "settings.showOnlineStatus": !$userData.settings.showOnlineStatus }) 
                            }}}
                        checked={$userData ? $userData.settings.showOnlineStatus : true} 
                        color="grape"/> 
                </div>
            </div>
        </div>

        <div class="notifications">
            <div class="left">
                <div class="category">
                    <Title size={20} align="right">Notifications</Title>
                </div>
            </div>
            <div class="right">
                <div class="setting">
                    <Text>Allow Notifications</Text>
                    <Switch
                        on:click={() => 
                            {if ($userCred && $userData) { 
                                updateDoc(doc(db, "users", $userCred.uid), { "settings.notifications": !$userData.settings.notifications }) 
                            }}}
                        checked={$userData ? $userData.settings.notifications : true} 
                        color="grape"/>
                </div>
            </div>
        </div>
        
        <div class="volume">
            <div class="left">
                <div class="category">
                    <Title size={20} align="right">Game Volume</Title>
                </div>
                
            </div>
            <div class="right">
                <div class="setting">
                    <div class="music">
                        <Text>Enable music</Text>
                        <Switch 
                            on:click={() => 
                                {if ($userCred && $userData) { 
                                    updateDoc(doc(db, "users", $userCred.uid), { "settings.music": !$userData.settings.music }) 
                                }}}
                            checked={$userData ? $userData.settings.music : true} 
                            color="grape"/>
                    </div>
                    <div class="sound">
                        <Text>Enable sounds</Text>
                        <Switch 
                            on:click={() => 
                                {if ($userCred && $userData) { 
                                    updateDoc(doc(db, "users", $userCred.uid), { "settings.sound": !$userData.settings.sound }) 
                                }}}
                            checked={$userData ? $userData.settings.sound : true} 
                            color="grape"/>
                    </div>
                </div>        
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .settings-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        margin-top: 3rem;

        .settings {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;

            .game-name, .online-status, .notifications, .volume {
                display: flex;
                flex-direction: row;
                justify-content: center;

                .left {
                    padding: 1rem 0;
                    width: 20rem;
                    background-color: rgb(45, 45, 45);

                    .category {
                        margin-right: 1rem;
                    }
                }

                .right {
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    width: 35rem;
                    background-color: rgba(106, 105, 105, 0.4);

                    .setting {
                        display: flex;
                        flex-direction: row;
                        gap: 1rem;
                        align-items: center;

                        margin-left: 1rem;

                        .music, .sound {
                            display: flex;
                            flex-direction: row;
                            gap: 1rem;
                        }
                    }
                }
            }
        }
    }
</style>