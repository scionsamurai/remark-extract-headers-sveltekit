<script>
    import { onMount } from 'svelte';
    export let data;

    let activeHeader = '';
    let tocElement;

    onMount(() => {

        document.querySelectorAll('h2, h3, h4, h5, h6').forEach(header => {
            const link = document.createElement('a');
            link.className = 'header-link';
            link.innerHTML = '#';
            link.href = `#${header.id}`;
            header.appendChild(link);
        });
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    activeHeader = entry.target.id;
                    scrollTocToActiveHeader();
                }
            });
        }, { rootMargin: '-100px 0px -66%' });

        data.meta.headers.forEach(header => {
            const element = document.getElementById(header.id);
            if (element) observer.observe(element);
            
            header.children.forEach(childHeader => {
                const childElement = document.getElementById(childHeader.id);
                if (childElement) observer.observe(childElement);
            });
        });

        return () => observer.disconnect();
    });
    function scrollTocToActiveHeader() {
        if (tocElement && activeHeader) {
            const activeElement = tocElement.querySelector(`a[href="#${activeHeader}"]`);
            if (activeElement) {
                activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }

    function scrollToHeader(event) {
        event.preventDefault();
        const id = event.target.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
</script>

<article>
    <h1>{data.meta.title}</h1>
    <p>{data.meta.slug}</p>
    
    <nav class="table-of-contents" bind:this={tocElement}>
        <h2>Table of Contents</h2>
        <ul>
            {#each data.meta.headers as header}
                <li class:active={activeHeader === header.id}>
                    <a href="#{header.id}">{header.text}</a>
                    {#if header.children.length > 0}
                        <ul>
                            {#each header.children as childHeader}
                                <li class:active={activeHeader === childHeader.id}>
                                    <a href="#{childHeader.id}">{childHeader.text}</a>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </li>
            {/each}
        </ul>
    </nav>
    <div class="content">
        <svelte:component this={data.content} />
    </div>
</article>

<style>
    .table-of-contents {
        max-height: 10rem;
        overflow: scroll;
        width: fit-content;
        position: fixed;
        right: 0;
        background-color: #f0f0f0;
        padding: 1rem;
    }
    nav {
		max-height: 10rem;
		overflow: scroll;
		width: fit-content;
		position: fixed;
		right: 0;
	}
    .content {
        max-width: 800px;
        margin: 0 auto;
    }
    .active {
        font-weight: bold;
        color: #ff3e00; /* Svelte's orange */
    }
    .active li {
		font-weight: initial;
		color: initial;
	}
    :global(.header-link) {
        opacity: 0;
        transition: opacity 0.2s;
        margin-left: 0.5em;
    }
    :global(h2:hover .header-link, h3:hover .header-link, h4:hover .header-link, h5:hover .header-link, h6:hover .header-link) {
        opacity: 1;
    }
</style>