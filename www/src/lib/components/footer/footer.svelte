<script lang="ts">
	import "./styles.scss"
	import { i18n } from '$lib/i18n/store.svelte';
	import { copyrightText, currentYear } from './+page';
</script>

<footer class="site-footer">
	<div class="footer-top">
		<div class="footer-brand">
			<span class="footer-brand-name">{i18n.t('brand')}</span>
			<p>{i18n.t('footer.tagline')}</p>
		</div>
		<div class="footer-col">
			<span class="footer-heading">{i18n.t('footer.productHeading')}</span>
			<a href="/prices">{i18n.t('nav.prices')}</a>
			<a href="/infrastructure">{i18n.t('nav.infrastructure')}</a>
			<a href="/documentation">{i18n.t('nav.documentation')}</a>
		</div>
		<div class="footer-col">
			<span class="footer-heading">{i18n.t('footer.companyHeading')}</span>
			<a href="/contact">{i18n.t('nav.contact')}</a>
			<a href="/terms">{i18n.t('terms.title')}</a>
			<a href="/login">{i18n.t('nav.login')}</a>
		</div>
	</div>
	<div class="footer-bottom">
		<span>{copyrightText(i18n.t('footer.copyright'), currentYear())}</span>
		<span>{i18n.t('footer.domain')}</span>
	</div>
</footer>
