<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMessage, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
	import { Text, Title, Button, Menu, Group, Stack } from '@svelteuidev/core';
	import { signInGoogle, signOutUser } from '$lib/firebase/user';
	import { userCred, userData } from '$lib/firebase/user';
	import { doc, updateDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase/app';
</script>

<svelte:head>
	<title>Wedoku</title>
</svelte:head>

{#if $userCred}
<header>
	<Menu trigger="hover" position="right" gutter={5}>
		<Group slot="control" override={{ cursor: "pointer" }}>
			<img src="{$userCred.photoURL}" alt="Avatar" />
			<Stack>
				<Text>{$userCred.displayName}</Text>
				<Text size={10}>UID: {$userCred.uid}</Text>
			</Stack>
		</Group>
		
		<!-- https://github.com/svelteuidev/svelteui/issues/373 -->
		<Menu.Item root="a" href="/profile/{$userCred.uid}" icon={Fa} iconProps={{ icon: faUser }}>
			<Text>Profile</Text>
		</Menu.Item>
		<Menu.Item 
			on:click={() => {
				if ($userCred) {
					updateDoc(doc(db, "users", $userCred.uid), { onlineStatus: "offline"});
					signOutUser()
				}
			}} 
			icon={Fa} 
			iconProps={{ icon: faRightFromBracket, color: "red" }}>
			<Text color="red">Logout</Text>
		</Menu.Item>
	</Menu>

	<!-- <div class="nav-buttons">
		<Fa icon={faMessage} size="lg" style="cursor: pointer" />
	</div> -->
</header>
{/if}

<main>
	<div class="welcome-text">
		<Title align="center" size={80} variant='gradient' gradient={{from: 'pink', to: 'grape', deg: 45}}>Wedoku</Title>
		{#if !($userCred && $userData)}
			<Title align="center" size={20}>Experience Sudoku like never before.</Title>
			<div class="welcome-signup">
				<Button on:click={signInGoogle} ripple variant="gradient" size={50} gradient={{ from: 'grape', to: 'pink', deg: 35 }} >
					LOGIN
				</Button>
			</div>
		{/if}
	</div>
	
	<div class="list" >
		<div class="item">
			<a href="/single">
				<img src="/1.jpg" alt="" />
				<div class="content">
					<h1>Single-Player</h1>
					<div class="des">
						Enjoy the classic Sudoku puzzle game with our online Single Player Mode. Challenge yourself with various difficulty levels 
						and track your progress as you improve your skills. Play anytime, anywhere and become a Sudoku master!
					</div>
				</div>
			</a>
		</div>

		<div class="item">
			<a href={$userCred && $userData ? "/multi" : ""}>
				<img src="/2.jpg" alt="" />
				<div class="content">
					<h1>Multiplayer</h1>
					<div class="des">
						Compete head-to-head with another player in our multiplayer mode and see who can solve the Sudoku puzzle the fastest. It's 
						a thrilling test of skill and speed!
					</div>
					{#if !($userCred && $userData)}<h2 class="notice">Please sign in first!</h2>{/if}
				</div>
			</a>
		</div>

		<div class="item">
			<img src="/3.jpg" alt="" />
			<div class="content">
				<h1>Sudoku Lessons</h1>
				<div class="des">
					Take your Sudoku skills to the next level with our document page! Find tips, strategies, and tricks to help you become a 
					Sudoku master. Learn from the best and beat the rest!
				</div>
				<h2 class="notice">Coming Soon!</h2>
			</div>
		</div>
	</div>
		
	<!--<div class="tip-recommended-wrapper">
		{#if $userCred && $userData}
		<div class="recommended-match-wrapper">
			<Title order={2}>Recommended Match</Title>
			<div class="recommended-match">
				<div class="avatar-name">
					<img src="/favicon.png" alt="Avatar" id="avatar" />
					<h5>loremipsum</h5>
					<img
						src="https://cdn.jsdelivr.net/npm/flag-icons/flags/4x3/vn.svg"
						alt="Country Flag"
						id="flag"
					/>
				</div>
				<div class="h2h-record">
					<p class="score win">0</p>
					<p class="score dash">/</p>
					<p class="score loss">0</p>
				</div>
				<Button variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 35 }}>
					Challenge
				</Button>
			</div>
		</div>
		{/if}
	</div> -->

</main>

<footer />

<style lang="scss">
	@use 'sass:color';

	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		img {
			aspect-ratio: 1;
			width: 20%;
		}

		/* .nav-buttons {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			gap: 1rem;
		} */
	}

	main {
		display: flex;
		flex-direction: column;
		gap: 4rem;

		.welcome-text {
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 3rem;

			.welcome-signup {
				display: flex;
				flex-direction: row;
				justify-content: center;
				gap: 3rem;
			}
		}

		.list {			
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			margin: 0 auto;
  			width: 1000px;
			grid-template-rows: 450px;
			gap: 3rem;
			.item {
				color: #fff;
				position: relative;
				transition: 0.5s;
				img {
					width: 100%;
					height: 100%;
					border-radius: 20px;
					object-fit: cover;
					transition: 0.5s;
				}
				&:hover {
					img {
						transform: scale(1.2);
						filter: blur(8px) brightness(40%);
						
					}
					.content {
						opacity: 1;
						transform: translateY(0);

						.notice {
							color: rgba(255, 58, 58)						}
					}
				}
				.content {
					position: absolute;
					bottom: 0;
					color: #fff;
					padding: 20px;
					transform: translateY(100px);
					opacity: 0;
					transition: 0.5s;
				}
			}
		}

		/* .tip-recommended-wrapper {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.recommended-match-wrapper {
				display: flex;
				flex-direction: column;
				gap: 1rem;

				.recommended-match {
					display: flex;
					flex-direction: row;
					align-items: center;
					gap: 14rem;
					padding: 0.2rem 1rem;

					background-color: $menu-div-color;

					.avatar-name {
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

					.h2h-record {
						display: flex;
						flex-direction: row;
						gap: 0.4rem;

						.win {
							color: rgba(38, 190, 38, 0.782);
						}

						.loss {
							color: rgba(208, 37, 37, 0.782);
						}
					}
				}
			}
		} */
	}
</style>
