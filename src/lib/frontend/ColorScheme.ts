import { theme } from "@svelteuidev/core"

export function buttonStyles(isDark: boolean): Record<"fg" | "hl", string>
{
    if (isDark)
    {
        return {
            fg: theme.colors.grape500.value,
            hl: theme.colors.grape200.value
        }
    }
    else
    {
        return { fg: "", hl: "" }
    }
}

export function cellStyles(isDark: boolean): Record<"hl1" | "hl2", string>
{
    if (isDark)
    {
        return {
            hl1: theme.colors.grape500.value + "cf",
            hl2: theme.colors.grape600.value + "2f"
        }
    }
    else
    {
        return {
            hl1: "",
            hl2: ""
        }
    }
}