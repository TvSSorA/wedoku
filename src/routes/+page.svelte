<script lang="ts">
	import Fa from 'svelte-fa';
	import { faUserGroup, faMessage, faLightbulb } from '@fortawesome/free-solid-svg-icons';
	import { Card, Text, Title, Image, Anchor, Button, Tooltip } from '@svelteuidev/core';

	const navicons = [faUserGroup, faMessage];
</script>

<header>
	<div class="avatar-wrapper">
		<img src="/favicon.png" alt="Avatar" id="avatar" />
		<h5>loremipsum</h5>
		<img
			src="https://cdn.jsdelivr.net/npm/flag-icons/flags/4x3/vn.svg"
			alt="Country Flag"
			id="flag"
		/>
	</div>

	<div class="nav-buttons">
		{#each navicons as icon}
			<Fa {icon} size="lg" style="cursor: pointer" />
		{/each}
	</div>
</header>

<main>
	<div class="welcome-text">
		<Title align="center" size={80}>Wedoku</Title>
		<Title align="center" size={30}>Experience Sudoku like never before.</Title>
		<div class="welcome-signup">
			<Button ripple variant="gradient" size={40} gradient={{ from: 'grape', to: 'pink', deg: 35 }}>
				REGISTER
			</Button>
			<Text size={40}>/</Text>
			<Button ripple variant="gradient" size={40} gradient={{ from: 'grape', to: 'pink', deg: 35 }}>
				LOGIN
			</Button>
		</div>
	</div>
	<div class="quick-start-buttons">
		<Anchor
			href="/single"
			override={{
				textDecoration: 'none',
				width: '25%',
				'&:hover': { textDecoration: 'none' }
			}}
		>
			<Card
				override={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					'&:hover': { backgroundColor: '$dark400' }
				}}
			>
				<Image src="/board_screenshot.png" alt="Sudoku Board" />
				<Card.Section>
					<Text root="h3" weight={'bold'}>Play Single-Player</Text>
				</Card.Section>
			</Card>
		</Anchor>

		<Anchor
			override={{
				textDecoration: 'none',
				width: '25%',
				'&:hover': { textDecoration: 'none' }
			}}
		>
			<Tooltip label="Coming soon!" color="grape" withArrow gutter={10} arrowSize={3}>
				<Card
					override={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						'&:hover': { backgroundColor: '$dark400' }
					}}
				>
					<Image src="/board_screenshot.png" alt="Sudoku Board" />
					<Card.Section>
						<Text root="h3" weight={'bold'}>Play Multiplayer</Text>
					</Card.Section>
				</Card>
			</Tooltip>
		</Anchor>

		<Anchor
			override={{
				textDecoration: 'none',
				width: '25%',
				'&:hover': { textDecoration: 'none' }
			}}
		>
			<Tooltip label="Coming soon!" color="grape" withArrow gutter={10} arrowSize={3}>
				<Card
					override={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						'&:hover': { backgroundColor: '$dark400' }
					}}
				>
					<Image src="/board_screenshot.png" alt="Sudoku Board" />
					<Card.Section>
						<Text root="h3" weight={'bold'}>Sudoku Lessons</Text>
					</Card.Section>
				</Card>
			</Tooltip>
		</Anchor>
	</div>

	<div class="tip-recommended-wrapper">
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

		.quick-start-buttons {
			display: flex;
			flex-direction: row;
			justify-content: center;
			gap: 5rem;
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
