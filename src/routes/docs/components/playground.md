<script lang="ts">
    import { Showcase, APIDocs } from "$site/lib";
    import { Expander } from "$lib";
    import { Button, InfoBar } from "$lib";
    import { Button, ContentDialog, InfoBar } from "$lib";

    let open = true;

    import Circle from "@fluentui/svg-icons/icons/circle_16_regular.svg?raw";

    import data from "$lib/Expander/Expander.svelte?raw&sveld";
</script>
Expander + ContentDialog.
<Showcase style="block-size: 360px;" repl="78aa3269aba34022a958311963520428">
    <Expander>
        Expander
        <svelte:fragment slot="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </svelte:fragment>
    </Expander>
    <Expander>
        <svelte:fragment slot="icon">
            {@html Circle}
        </svelte:fragment>
        Expander
        <svelte:fragment slot="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </svelte:fragment>
    </Expander>
    <Expander direction="up">
        Expander
        <svelte:fragment slot="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </svelte:fragment>
    </Expander>
</Showcase>
Button.
<Showcase columns={3} repl="0c6ca42e2c5c4868a7a8c1a1a45759eb">
    <Button variant="standard">Button</Button>
    <Button variant="accent">Button</Button>
    <Button variant="hyperlink">Button</Button>
    <Button variant="standard" disabled>Button</Button>
    <Button variant="accent" disabled>Button</Button>
    <Button variant="hyperlink" disabled>Button</Button>
</Showcase>
ContentDialog. let open = true;
<Showcase style="block-size: 360px;" repl="0fde4983fdc841d8b7320143ee3d50d7">
    <Button on:click={() => open = true}>
        Open
    </Button>
    <ContentDialog bind:open trapFocus={false} darken={false} title="Dialog Title">
        Some text
        <svelte:fragment slot="footer">
            <Button variant="accent" on:click={() => open = false}>
                Button 1
            </Button>
        </svelte:fragment>
    </ContentDialog>
</Showcase>