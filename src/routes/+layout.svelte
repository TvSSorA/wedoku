<script>
	import '../app.scss';
	import 'agnostic-svelte/css/common.min.css';
	import Fa from "svelte-fa";
	import { faCircle } from "@fortawesome/free-solid-svg-icons";
	import { Button, Disclose } from "agnostic-svelte";
</script>

<section id="bg" />

<section class="menu">
	<img src="/favicon.png" alt="Logo">

	<div class="main-buttons">
		<Button isBlock isBordered mode="secondary">Play</Button>
		<Button isBlock isBordered>Learn</Button>
		<Button isBlock isBordered>News</Button>
		<Button isBlock isBordered>Social</Button>
		<Button isBlock isBordered mode="primary">Get Diamond Membership</Button>
	</div>

	<div class="footer-buttons">
		<Button isBlock>Settings</Button>
		<Button isBlock>Help</Button>
	</div>
</section>

<main>
	<slot />
</main>

<section class="friends">
	<Disclose isBackground title="Friends">
		<div class="user">
			<img src="/favicon.png" alt="Avatar">
			<p class="username">lorem ipsum</p>
			<Fa icon={faCircle} size="xs" scale={0.7} translateX={0.5} style="color: #04ff00;"  />
		</div>
		<div class="user">
			<img src="/favicon.png" alt="Avatar">
			<p class="username">lorem ipsum</p>
			<Fa icon={faCircle} size="xs" scale={0.7} translateX={0.5} style="color: #FF2D00;"  />
		</div>
		<div class="user">
			<img src="/favicon.png" alt="Avatar">
			<p class="username">lorem ipsum</p>
			<Fa icon={faCircle} size="xs" scale={0.7} translateX={0.5} style="color: #FF9E00;"  />
		</div>
	</Disclose>
</section>

<style lang="scss">
	#bg {
		background-color: var(--agnostic-light); //$background-color;
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: -99;
	}
	.menu {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		position: absolute;
		width: 10vw;
		height: 100vh;
		z-index: 99;

		//background-color: $menu-color;
		img {
			width: 80%;
		}

		.main-buttons {
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 100%;

			:global(.btn) {
				white-space: pre-wrap;
			}
		}

		.footer-buttons {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		.btn {
			&:hover {
				color: black;

				&:after {
					transform: skewX(-45deg) scale(1, 1);
					-webkit-transition: all 0.5s;
					transition: all 0.5s;
				}
			}

			&:after {
				content: "";
				background: white;
				position: absolute;
				z-index: -1;
				left: -20%;
				right: -20%;
				top: 0;
				bottom: 0;
				transform: skewX(-45deg) scale(0, 1);
				transition: all 0.5s;					
			}
		}
	}

	.friends {
		position: absolute;
		right: 0;
		top: 0;
		width: 10vw;
		height: 100vh;
		z-index: 99;
		overflow: hidden;

		//background-color: $menu-color;

		.user {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 0.5vw;

			img {
				max-width: 30%;
			}

			.username {
				font-size: 80%;
				text-overflow: ellipsis;
			}
		}
	}
</style>




