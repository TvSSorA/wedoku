export function blockFromCoords(row: number, col: number)
{
    return Math.floor(row / 3) * 3 + Math.floor(col / 3);
}

// dont ask me about this, im brainfried reading it but it works
// just know that we use this instead of setInterval() for a much much more accurate timer
export function accurateInterval(func: () => unknown, ms: number)
{
    let prev = performance.now();
    let delay = ms;
    const wrapper = () => {
        const cur = performance.now();
        const drift = Math.round(cur - prev) - delay;
        delay = ms - drift;
        
        prev = cur;
        timer = setTimeout(wrapper, delay);
        func();
    }
    let timer = setTimeout(wrapper, delay);
    return () => clearTimeout(timer);
}
