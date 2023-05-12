<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faMessage,
		faUser,
		faRightFromBracket,
		faLightbulb,
		faPencil,
		faKhanda,
		faBookTanakh
	} from '@fortawesome/free-solid-svg-icons';
	import { slide } from 'svelte/transition';
	import {
		Card,
		Text,
		Title,
		Anchor,
		Button,
		Tooltip,
		Menu,
		Group,
		Stack,
		Grid
	} from '@svelteuidev/core';
	import { signInGoogle, signOutUser } from '$lib/firebase/user';
	import { userCred, userData } from '$lib/firebase/user';

</script>

{#if $userCred}
	<header>
		<Menu trigger="hover" position="right" gutter={5}>
			<Group slot="control" override={{ cursor: 'pointer' }}>
				<img src={$userCred.photoURL} alt="Avatar" />
				<Stack>
					<Text>{$userCred.displayName}</Text>
					<Text size={10}>UID: {$userCred.uid}</Text>
				</Stack>
			</Group>

			<!-- https://github.com/svelteuidev/svelteui/issues/373 -->
			<Menu.Item
				root="a"
				href="/profile/{$userCred.uid}"
				icon={Fa}
				iconProps={{ iconProps: { icon: faUser } }}
			>
				<Text>Profile</Text>
			</Menu.Item>
			<Menu.Item
				on:click={signOutUser}
				icon={Fa}
				iconProps={{ iconProps: { icon: faRightFromBracket, color: 'red' } }}
			>
				<Text color="red">Logout</Text>
			</Menu.Item>
		</Menu>

		<div class="nav-buttons">
			<Fa icon={faMessage} size="lg" style="cursor: pointer" />
		</div>
	</header>
{/if}

<main>
	<div class="welcome-text">
		<Title
			align="center"
			size={80}
			variant="gradient"
			gradient={{ from: 'pink', to: 'grape', deg: 45 }}>Wedoku</Title
		>
		{#if !($userCred && $userData)}
			<Title align="center" size={20}>Experience Sudoku like never before.</Title>
			<div class="welcome-signup">
				<Button
					on:click={signInGoogle}
					ripple
					variant="gradient"
					size={50}
					gradient={{ from: 'grape', to: 'pink', deg: 35 }}
				>
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
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ut adipisci saepe
						laboriosam assumenda dolorem fuga natus, inventore a perspiciatis accusamus aperiam
						sequi cupiditate velit repellendus reiciendis deleniti praesentium sit?
					</div>
				</div>
			</a>
		</div>

		<div class="item">
			<img src="/2.jpg" alt="" />
			<div class="content">
				<h1>Multiplayer</h1>
				<div class="des">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ut adipisci saepe
					laboriosam assumenda dolorem fuga natus, inventore a perspiciatis accusamus aperiam sequi
					cupiditate velit repellendus reiciendis deleniti praesentium sit?
				</div>
			</div>
		</div>

		<div class="item">
			<img src="/3.jpg" alt="" />
			<div class="content">
				<h1>Sudoku Lessons</h1>
				<div class="des">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ut adipisci saepe
					laboriosam assumenda dolorem fuga natus, inventore a perspiciatis accusamus aperiam sequi
					cupiditate velit repellendus reiciendis deleniti praesentium sit?
				</div>
			</div>
		</div>
	</div>

	<div class="tip-recommended-wrapper">
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

		<div class="daily-tip">
			<div class="header">
				<Fa icon={faLightbulb} size="1.5x" />
				<Title order={3}>Did you know?</Title>
			</div>

			<Text align="center">loremipsum</Text>
		</div>
	</div>
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

		.quick-start-buttons {
			display: flex;
			flex-direction: row;
			justify-content: center;
			gap: 5rem;

			margin-top: 5rem;
		}

		.tip-recommended-wrapper {
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

			.daily-tip {
				display: flex;
				flex-direction: column;
				justify-content: center;
				gap: 1rem;

				padding: 0 1rem;
				background-color: $menu-div-color;

				.header {
					display: flex;
					flex-direction: row;
					gap: 1rem;
					align-items: center;
				}
			}
		}
	}
</style>
