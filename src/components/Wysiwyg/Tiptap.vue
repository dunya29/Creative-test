<script setup>
	import TextStyle from '@tiptap/extension-text-style'
	import { Editor, EditorContent } from '@tiptap/vue-3'
	import StarterKit from '@tiptap/starter-kit'
	import { onMounted, ref, watch } from 'vue'
	import Underline from '@tiptap/extension-underline'
	import Color from '@tiptap/extension-color'
	import Highlight from '@tiptap/extension-highlight'
	import Link from '@tiptap/extension-link'
	import Superscript from '@tiptap/extension-superscript'
	import Subscript from '@tiptap/extension-subscript'
	import TextAlign from '@tiptap/extension-text-align'
	import CharacterCount from '@tiptap/extension-character-count'
	import TiptapDrop from './TiptapDrop.vue'
	import { debounce } from '@/functions/debounce'

	const props = defineProps({
		modelValue: String,
		indexToolbar: Boolean,
		limit: Number
	})
	const emit = defineEmits(['update:modelValue'])
	const editor = ref(null)
	const setLink = () => {
		const previousUrl = editor.value.getAttributes('link').href
		const url = window.prompt('URL', previousUrl)
		// cancelled
		if (url === null) {
			return
		}
		// empty
		if (url === '') {
			editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
			return
		}
		// update link
		editor.value
			.chain()
			.focus()
			.extendMarkRange('link')
			.setLink({ href: url })
			.run()
	}
	const update = () => {
		emit(
			'update:modelValue',
			editor.value
				.getHTML()
				.replace(/^(<p><\/p>){1,}/, '')
				.replace(/(<p><\/p>){2,}$/, '')
		)
	}
	const debouncedContent = debounce(update, 500)
	onMounted(() => {
		editor.value = new Editor({
			content: props.modelValue,
			extensions: [
				StarterKit,
				TextAlign.configure({
					types: ['heading', 'paragraph'],
				}),
				CharacterCount.configure({
					limit: props.limit,
				}),
				Underline,
				Subscript,
				Superscript,
				Color,
				Highlight,
				TextStyle,
				Link,
				CharacterCount.configure(),
			],
			injectCSS: false,
			onUpdate() {
				debouncedContent()
			},
		})
	})
	watch(
		() => props.modelValue,
		() => {
			if (!props.modelValue) {
				editor.value.commands.clearContent()
			} else {
				if (editor.value.getHTML() !== props.modelValue) {
					editor.value.commands.setContent(props.modelValue)
				}
			}
		}
	)
</script>
<template>
	<div class="editor" v-if="editor">
		<div class="control-group">
			<div class="button-group">
				<button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().undo()">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M10.4 9.4C8.7 9.7 7.2 10.3 5.8 11.4L3 8.5V15.5H10L7.3 12.8C11 10.2 16.1 11 18.8 14.7C19 15 19.2 15.2 19.3 15.5L21.1 14.6C18.9 10.8 14.7 8.7 10.4 9.4Z" />
					</svg>
				</button>
				<button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().redo()">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M13.6 9.4C15.3 9.7 16.8 10.3 18.2 11.4L21 8.5V15.5H14L16.7 12.8C13 10.1 7.9 11 5.3 14.7C5.1 15 4.9 15.2 4.8 15.5L3 14.6C5.1 10.8 9.3 8.7 13.6 9.4Z" />
					</svg>
				</button>
				<TiptapDrop title="Заголовок">
					<button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor && editor.isActive('heading', { level: 1 }) }">
						H1
					</button>
					<button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor && editor.isActive('heading', { level: 2 }) }">
						H2
					</button>
					<button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor && editor.isActive('heading', { level: 3 }) }">
						H3
					</button>
					<button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor && editor.isActive('heading', { level: 4 }) }">
						H4
					</button>
				</TiptapDrop>
				<button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M15.2504 11.8C15.74 11.5018 16.1532 11.0934 16.4571 10.6073C16.7609 10.1212 16.9469 9.57077 17.0004 9C17.0097 8.48388 16.9172 7.971 16.7282 7.49063C16.5392 7.01027 16.2575 6.57184 15.899 6.20039C15.5406 5.82894 15.1124 5.53174 14.6391 5.32578C14.1658 5.11981 13.6565 5.00911 13.1404 5H6.65039V19H13.6504C14.1415 18.9948 14.6269 18.8929 15.0786 18.7001C15.5304 18.5073 15.9397 18.2274 16.2833 17.8764C16.6269 17.5253 16.898 17.1101 17.0811 16.6543C17.2642 16.1985 17.3557 15.7112 17.3504 15.22V15.1C17.3507 14.4071 17.1533 13.7285 16.7813 13.144C16.4093 12.5594 15.8782 12.0931 15.2504 11.8ZM8.65039 7H12.8504C13.2766 6.98681 13.6966 7.10428 14.0541 7.33665C14.4116 7.56902 14.6894 7.90517 14.8504 8.3C15.0133 8.82779 14.9606 9.39859 14.7039 9.88765C14.4472 10.3767 14.0073 10.7443 13.4804 10.91C13.2758 10.97 13.0636 11.0003 12.8504 11H8.65039V7ZM13.2504 17H8.65039V13H13.2504C13.6766 12.9868 14.0966 13.1043 14.4541 13.3367C14.8116 13.569 15.0894 13.9052 15.2504 14.3C15.4133 14.8278 15.3606 15.3986 15.1039 15.8877C14.8472 16.3767 14.4073 16.7443 13.8804 16.91C13.6758 16.97 13.4636 17.0003 13.2504 17Z" />
					</svg>
				</button>
				<button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M11.7605 9H13.7605L11.5605 19H9.56055L11.7605 9ZM13.4405 5C13.2428 5 13.0494 5.05865 12.885 5.16853C12.7205 5.27841 12.5924 5.43459 12.5167 5.61732C12.441 5.80004 12.4212 6.00111 12.4598 6.19509C12.4983 6.38907 12.5936 6.56725 12.7334 6.70711C12.8733 6.84696 13.0515 6.9422 13.2455 6.98079C13.4394 7.01937 13.6405 6.99957 13.8232 6.92388C14.006 6.84819 14.1621 6.72002 14.272 6.55557C14.3819 6.39112 14.4405 6.19778 14.4405 6C14.4405 5.73478 14.3352 5.48043 14.1477 5.29289C13.9601 5.10536 13.7058 5 13.4405 5Z" />
					</svg>
				</button>
				<button @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M19 20V22H5V20H19ZM16 13.215C15.9671 13.875 15.7711 14.5165 15.4297 15.0823C15.0883 15.6481 14.6121 16.1205 14.0435 16.4572C13.475 16.794 12.8318 16.9847 12.1716 17.0122C11.5114 17.0397 10.8546 16.9033 10.26 16.615C9.57464 16.3185 8.99341 15.8241 8.59077 15.1952C8.18813 14.5663 7.98242 13.8315 8 13.085V5.005H6V13.215C6.03383 14.1564 6.28885 15.0766 6.74442 15.9012C7.19998 16.7257 7.84329 17.4314 8.62227 17.9611C9.40125 18.4908 10.294 18.8296 11.2283 18.9502C12.1625 19.0707 13.1121 18.9696 14 18.655C15.1811 18.2613 16.2059 17.5012 16.9252 16.485C17.6446 15.4689 18.0211 14.2498 18 13.005V5.005H16V13.215ZM16 5H18H16ZM8 5H6H8Z" />
					</svg>
				</button>
				<button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M11.75 3.5C8.9805 3.5 6 4.83 6 7.75C6 8.714 6.36913 9.435 6.95313 10H10.0293C8.4258 9.4485 7.5 8.854 7.5 7.75C7.5 5.5745 10.28 5 11.75 5C14.271 5 15.6852 6.25028 15.7412 6.30078C16.0452 6.58178 16.5198 6.56327 16.8008 6.25977C17.0818 5.95577 17.0638 5.48072 16.7598 5.19922C16.6843 5.12972 14.885 3.5 11.75 3.5ZM4.75 11.5C4.65062 11.4986 4.55194 11.517 4.45972 11.554C4.36749 11.5911 4.28355 11.6461 4.21277 11.7159C4.142 11.7857 4.08579 11.8688 4.04743 11.9605C4.00907 12.0522 3.98932 12.1506 3.98932 12.25C3.98932 12.3494 4.00907 12.4478 4.04743 12.5395C4.08579 12.6312 4.142 12.7143 4.21277 12.7841C4.28355 12.8539 4.36749 12.9089 4.45972 12.946C4.55194 12.983 4.65062 13.0014 4.75 13H14.3828C15.717 13.6167 16.5 14.4079 16.5 15.75C16.5 16.8835 15.1065 19 11.75 19C8.664 19 6.90896 16.8722 6.83496 16.7812C6.57646 16.4582 6.1062 16.4056 5.7832 16.6631C5.4592 16.9211 5.40509 17.3928 5.66309 17.7168C5.75359 17.8308 7.921 20.5 11.75 20.5C16.0135 20.5 18 17.6655 18 15.75C18 14.5741 17.5974 13.6898 16.9619 13H19.25C19.3494 13.0014 19.4481 12.983 19.5403 12.946C19.6325 12.9089 19.7164 12.8539 19.7872 12.7841C19.858 12.7143 19.9142 12.6312 19.9526 12.5395C19.9909 12.4478 20.0107 12.3494 20.0107 12.25C20.0107 12.1506 19.9909 12.0522 19.9526 11.9605C19.9142 11.8688 19.858 11.7857 19.7872 11.7159C19.7164 11.6461 19.6325 11.5911 19.5403 11.554C19.4481 11.517 19.3494 11.4986 19.25 11.5H4.75Z"></path>
					</svg>
				</button>
				<button v-if="indexToolbar" @click="editor.chain().focus().toggleSubscript().run()" :class="{ 'is-active': editor.isActive('subscript') }">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M9.175 20V5.832H4.23V3.9H16.305V5.832H11.36V20H9.175Z" />
						<path d="M16.25 22V21.14C16.4367 20.7867 16.6633 20.47 16.93 20.19C17.1967 19.91 17.4933 19.6233 17.82 19.33C18.0933 19.0833 18.3133 18.88 18.48 18.72C18.6533 18.56 18.78 18.41 18.86 18.27C18.9467 18.1233 18.99 17.9567 18.99 17.77C18.99 17.2967 18.68 17.06 18.06 17.06C17.7733 17.06 17.4933 17.0933 17.22 17.16C16.9533 17.2267 16.7 17.31 16.46 17.41V15.81C16.7333 15.7033 17.0533 15.62 17.42 15.56C17.7867 15.4933 18.1567 15.46 18.53 15.46C19.33 15.46 19.9267 15.65 20.32 16.03C20.7133 16.4033 20.91 16.9067 20.91 17.54C20.91 17.84 20.8733 18.1 20.8 18.32C20.7333 18.5333 20.6267 18.73 20.48 18.91C20.3333 19.09 20.1433 19.2833 19.91 19.49C19.7033 19.67 19.5 19.85 19.3 20.03C19.1 20.21 18.94 20.3867 18.82 20.56H20.97V22H16.25Z" />
					</svg>
				</button>
				<button v-if="indexToolbar" @click="editor.chain().focus().toggleSuperscript().run()" :class="{ 'is-active': editor.isActive('superscript') }">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M9.175 20V5.832H4.23V3.9H16.305V5.832H11.36V20H9.175Z" />
						<path d="M16.25 8V7.14C16.4367 6.78667 16.6633 6.47 16.93 6.19C17.1967 5.91 17.4933 5.62333 17.82 5.33C18.0933 5.08333 18.3133 4.88 18.48 4.72C18.6533 4.56 18.78 4.41 18.86 4.27C18.9467 4.12333 18.99 3.95667 18.99 3.77C18.99 3.29667 18.68 3.06 18.06 3.06C17.7733 3.06 17.4933 3.09333 17.22 3.16C16.9533 3.22667 16.7 3.31 16.46 3.41V1.81C16.7333 1.70333 17.0533 1.62 17.42 1.56C17.7867 1.49333 18.1567 1.46 18.53 1.46C19.33 1.46 19.9267 1.65 20.32 2.03C20.7133 2.40333 20.91 2.90667 20.91 3.54C20.91 3.84 20.8733 4.1 20.8 4.32C20.7333 4.53333 20.6267 4.73 20.48 4.91C20.3333 5.09 20.1433 5.28333 19.91 5.49C19.7033 5.67 19.5 5.85 19.3 6.03C19.1 6.21 18.94 6.38667 18.82 6.56H20.97V8H16.25Z" />
					</svg>
				</button>
				<button @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M11 17H7C5.67392 17 4.40215 16.4732 3.46447 15.5355C2.52678 14.5979 2 13.3261 2 12C2 10.6739 2.52678 9.40215 3.46447 8.46447C4.40215 7.52678 5.67392 7 7 7H11V9H7C6.20435 9 5.44129 9.31607 4.87868 9.87868C4.31607 10.4413 4 11.2044 4 12C4 12.7956 4.31607 13.5587 4.87868 14.1213C5.44129 14.6839 6.20435 15 7 15H11V17ZM17 7H13V9H17C17.7956 9 18.5587 9.31607 19.1213 9.87868C19.6839 10.4413 20 11.2044 20 12C20 12.7956 19.6839 13.5587 19.1213 14.1213C18.5587 14.6839 17.7956 15 17 15H13V17H17C18.3261 17 19.5979 16.4732 20.5355 15.5355C21.4732 14.5979 22 13.3261 22 12C22 10.6739 21.4732 9.40215 20.5355 8.46447C19.5979 7.52678 18.3261 7 17 7V7ZM16 11H8V13H16V11Z" />
					</svg>
				</button>
				<button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M3 18H9V16H3V18ZM3 11V13H15V11H3ZM3 6V8H21V6H3Z" />
					</svg>
				</button>
				<button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M9 18H15V16H9V18ZM6 11V13H18V11H6ZM3 6V8H21V6H3Z" />
					</svg>
				</button>
				<button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M15 18H21V16H15V18ZM9 11V13H21V11H9ZM3 6V8H21V6H3Z" />
					</svg>
				</button>
				<button @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M3 18H21V16H3V18ZM3 11V13H21V11H3ZM3 6V8H21V6H3Z" />
					</svg>
				</button>
				<button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M4 10.5C3.2 10.5 2.5 11.2 2.5 12C2.5 12.8 3.2 13.5 4 13.5C4.8 13.5 5.5 12.8 5.5 12C5.5 11.2 4.8 10.5 4 10.5ZM4 5.5C3.2 5.5 2.5 6.2 2.5 7C2.5 7.8 3.2 8.5 4 8.5C4.8 8.5 5.5 7.8 5.5 7C5.5 6.2 4.8 5.5 4 5.5ZM4 15.5C3.2 15.5 2.5 16.2 2.5 17C2.5 17.8 3.2 18.5 4 18.5C4.8 18.5 5.5 17.8 5.5 17C5.5 16.2 4.8 15.5 4 15.5ZM7.5 6V8H21.5V6H7.5ZM7.5 18H21.5V16H7.5V18ZM7.5 13H21.5V11H7.5V13Z" />
					</svg>
				</button>
				<button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M2.5 16H4.5V16.5H3.5V17.5H4.5V18H2.5V19H5.5V15H2.5V16ZM3.5 9H4.5V5H2.5V6H3.5V9ZM2.5 11H4.3L2.5 13.1V14H5.5V13H3.7L5.5 10.9V10H2.5V11ZM7.5 6V8H21.5V6H7.5ZM7.5 18H21.5V16H7.5V18ZM7.5 13H21.5V11H7.5V13Z" />
					</svg>
				</button>
				<button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor && editor.isActive('blockquote') }">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M8.82812 16.0469H6.5625L8.85938 11.2656H6.5625V6.59375H11.2344V11.2656L8.82812 16.0469ZM15.1094 16.0469H12.8281L15.1406 11.2656H12.8281V6.59375H17.5V11.2656L15.1094 16.0469Z" />
					</svg>
				</button>
				<label>
					<input type="color" @input="e => editor.chain().focus().setColor(e.target.value).run()" :value="editor.getAttributes('textStyle').color">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M9.91659 12.2409L17.6645 6.85076L18.8439 8.14667L12.7499 15.3541L9.91659 12.2409ZM7.58648 12.6521L12.1218 17.6354C12.2157 17.7284 12.3283 17.8004 12.452 17.8467C12.5758 17.893 12.708 17.9125 12.8399 17.9039C12.9718 17.8953 13.1003 17.8588 13.2171 17.7969C13.3338 17.7349 13.4361 17.6489 13.5171 17.5445L20.9685 8.73151C21.1169 8.5684 21.201 8.35684 21.2049 8.13632C21.2088 7.91581 21.1324 7.7014 20.9898 7.53311L18.4768 4.77195C18.3227 4.61422 18.1164 4.51798 17.8965 4.50118C17.6766 4.48437 17.4581 4.54816 17.2817 4.68063L7.80807 11.2715C7.69651 11.3423 7.60125 11.4361 7.5286 11.5465C7.45595 11.6569 7.40755 11.7814 7.38661 11.9119C7.36567 12.0424 7.37265 12.1759 7.40711 12.3035C7.44156 12.4311 7.5027 12.5499 7.58648 12.6521ZM2.79297 18.5278L8.41033 19.5001L9.88946 18.1539L6.86057 14.8259L2.79297 18.5278Z" />
					</svg>
				</label>
			</div>
		</div>
		<EditorContent :editor="editor" class="custom-scroll editor-content" />
		<div class="editor-footer">
			{{ editor.storage.characterCount.characters() }}
		</div>
	</div>

</template>
<style lang="scss">
	.editor {
		border: 1px solid #eaeaea;
		border-radius: 5px;
		background: #ffffff;
		box-shadow: 0 0 2px #595959;
	}
	.control-group {
		padding: 5px 0;
	}
	.button-group > * {
		flex-shrink: 0;
		margin: 2px 6px;
		border: 1px solid transparent;
		&:disabled {
			opacity: 0.5;
		}
		&.is-active {
			border-color: #989898;
		}
	}
	.button-group {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		& > button,
		& > label {
			flex: 0 0 24px;
			width: 24px;
			height: 24px;
			position: relative;
			cursor: pointer;
			input {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
				cursor: pointer;
			}
			svg {
				fill: #595959;
				width: 100%;
				height: 100%;
				pointer-events: none;
			}
		}
		input[type='color'] + span {
			display: block;
			width: 100%;
			height: 4px;
			background: #595959;
			margin: 10px 0;
		}
		.tiptap-drop {
			width: auto;
			display: inline-block;
			position: relative;
			z-index: 1;
			&.open {
				.tiptap-drop__header span + svg {
					transform: rotate(180deg);
				}
				.tiptap-drop__header {
					background: #595959;
					border-color: #595959;
					span {
						color: white;
						& + svg {
							fill: white;
						}
					}
				}
			}
			&__header {
				padding: 2px 5px;
				background: #fff;
				display: flex;
				align-items: center;
				cursor: pointer;
				border: 1px solid transparent;
				transition: all 0.3s linear;
				&:hover {
					border-color: #989898;
				}
				span {
					font-size: 14px;
					font-weight: 400;
					color: #595959;
					svg {
						width: 24px;
						height: 24px;
					}
				}
				span + svg {
					fill: #595959;
					flex: 0 0 20px;
					width: 20px;
					height: 20px;
					margin-left: 5px;
					transition: all 0.3s linear;
				}
			}
			&__body {
				max-height: 300px;
				padding: 5px;
				overflow: auto;
				border: 1px solid #595959;
				box-shadow: 0 0 2px #595959;
				background: #fff;
				position: absolute;
				top: 100%;
				left: 0;
				width: 100%;
				button,
				label span {
					font-size: 14px;
					color: #595959;
					margin: 3px;
					text-align: left;
					cursor: pointer;
				}
			}
		}
	}
	.editor-content {
		height: 240px;
		overflow-y: scroll;
		padding: 20px 10px;
		border-top: 1px solid #eaeaea;
		border-bottom: 1px solid #eaeaea;
		&::-webkit-scrollbar {
			width: 4px;
		}
	}
	.tiptap {
		min-height: 100%;
		outline: none !important;
		sub,
		sup {
			font-size: 75%;
			line-height: 0;
			position: relative;
			vertical-align: baseline;
		}
		sup {
			top: -0.5em;
		}
		sub {
			bottom: -0.25em;
		}
		ul {
			list-style: disc;
			padding-left: 40px;
		}
		ol {
			list-style: decimal;
			padding-left: 40px;
		}
		ol li,
		ul li {
			font: inherit;
			line-height: inherit;
			&::marker {
				padding: 10px;
			}
		}
		ul li {
			list-style-type: disc;
		}
		ol li {
			list-style-type: decimal;
		}
		pre code {
			white-space: normal !important;
		}
		:first-child {
			margin-top: 0;
		}
		blockquote {
			& > p {
				padding-left: 24px;
			}
		}
		/* Table-specific styling */
		table {
			border-collapse: collapse;
			margin: 0;
			overflow: hidden;
			table-layout: fixed;
			width: 100%;

			td,
			th {
				border: 1px solid #989898;
				box-sizing: border-box;
				min-width: 1em;
				padding: 6px 8px;
				position: relative;
				vertical-align: top;

				> * {
					margin-bottom: 0;
				}
			}

			th {
				background-color: #989898;
				font-weight: bold;
				text-align: left;
			}

			.selectedCell:after {
				background: #989898;
				content: '';
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				pointer-events: none;
				position: absolute;
				z-index: 2;
			}

			.column-resize-handle {
				background-color: purple;
				bottom: -2px;
				pointer-events: none;
				position: absolute;
				right: -2px;
				top: 0;
				width: 4px;
			}
		}

		.tableWrapper {
			margin: 1.5rem 0;
			overflow-x: auto;
		}

		&.resize-cursor {
			cursor: ew-resize;
			cursor: col-resize;
		}
	}
	.editor-footer {
		font-size: 14px;
		color: #595959;
		padding: 10px;
	}
	@media (max-width: 767.98px) {
		.button-group > * {
			margin: 2px 4px;
		}
		.button-group {
			& > button,
			& > label {
				flex: 0 0 20px;
				width: 20px;
				height: 20px;
			}
			.tiptap-drop {
				&__header {
					span {
						font-size: 12px;
						svg {
							width: 20px;
							height: 20px;
						}
					}
				}
				&__body {
					button,
					label span {
						font-size: 12px;
					}
				}
			}
		}
		.editor-content,
		.editor-footer {
			padding: 10px 5px;
		}
	}
</style>
