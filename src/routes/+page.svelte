<script lang="ts">
    import Fa from 'svelte-fa';
    import { faUserGroup, faMessage } from '@fortawesome/free-solid-svg-icons';
    import { Card, Text, Image, Anchor } from '@svelteuidev/core';
    
    const navicons = [faUserGroup, faMessage];
</script>

<header>
    <div class="avatar-wrapper">
        <img src="/favicon.png" alt="Avatar" id="avatar">
        <h5>loremipsum</h5>
        <img src="https://cdn.jsdelivr.net/npm/flag-icons/flags/4x3/vn.svg" alt="Country Flag" id="flag">
    </div>
    
    <div class="nav-buttons">
        {#each navicons as icon}
            <Fa {icon} size="lg" style="cursor: pointer"/>
        {/each}
    </div>
</header>

<main>
    <div class="quick-start-buttons">
        <!-- <div class="quick-start-wrapper">
        <div class="mode-name-wrapper">
            <h3 id="mode-name">Single-Player mode</h3>
        </div>
        <img src="/board_screenshot.png" alt="Sudoku Board">
        <div class="bottom-mode-name">
            <h3>Play Single-Player</h3>
        </div>
        </div> 
        <div class="quick-start-wrapper">
            <div class="mode-name-wrapper">
                <h3 id="mode-name">Multiplayer Mode</h3>
            </div>
            <img src="/board_screenshot.png" alt="Sudoku Board">
            <div class="bottom-mode-name">
                <h3>Play Multiplayer</h3>
            </div>
        </div>

         <div class="quick-start-wrapper">
            <div class="mode-name-wrapper">
                <h3 id="mode-name">Learn Sudoku</h3>
            </div>
            <img src="/board_screenshot.png" alt="Sudoku Board">
            <div class="bottom-mode-name">
                <h3>Sudoku Lessons</h3>
            </div>
         </div>
    -->

        <Anchor href="/single" override={{ 
            textDecoration: "none", 
            width: "25%",
            "&:hover": 
                { textDecoration: "none" } 
        }}>
            <Card override={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: "center",
                "&:hover": { backgroundColor: "$dark400" }
            }}>
                <Image src='/board_screenshot.png' alt='Sudoku Board'/>
                <Card.Section>
                    <Text root='h3' weight={'bold'}>Play Single-Player</Text>
                </Card.Section>
             </Card>
        </Anchor>

        <Anchor override={{ 
            textDecoration: "none", 
            width: "25%",
            "&:hover": 
                { textDecoration: "none" } 
        }}>
            <Card override={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: "center",
                "&:hover": { backgroundColor: "$dark400" }
            }}>
                <Image src='/board_screenshot.png' alt='Sudoku Board'/>
                <Card.Section>
                    <Text root='h3' weight={'bold'}>Play Multiplayer</Text>
                </Card.Section>
             </Card>
        </Anchor>

        <Anchor override={{ 
            textDecoration: "none", 
            width: "25%",
            "&:hover": 
                { textDecoration: "none" } 
        }}>
            <Card override={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: "center",
                "&:hover": { backgroundColor: "$dark400" }
            }}>
                <Image src='/board_screenshot.png' alt='Sudoku Board'/>
                <Card.Section>
                    <Text root='h3' weight={'bold'}>Sudoku Lessons</Text>
                </Card.Section>
             </Card>
        </Anchor>
    </div>
</main>

<footer>

</footer>

<style lang="scss">
    @use 'sass:color';

    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .avatar-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 1rem;

            height: 2rem;

            #avatar {
                aspect-ratio: 1;
                height: 100%;
            }

            #flag {
                height: 30%;
            }
        }

        .nav-buttons {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            gap: 1rem;
            
            
        }
    }

    main {
        display: flex;
        flex-direction: column;

        .quick-start-buttons {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 5rem;

            /* .quick-start-wrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
                
                img {
                    aspect-ratio: 1;
                    width: 50%;
                }

                .mode-name-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .bottom-mode-name {
                    background-color: color.adjust($numeric-button-color, $lightness: -60%);
                }
            } */


        }
    }
</style>