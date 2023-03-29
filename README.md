## Để clone project về:

`git clone https://github.com/TvSSorA/wedoku` và mở directory đó bằng bất kỳ text editor mong muốn.

Sau khi clone, nhớ `pnpm install` để tải các dependencies (tool/extension dùng trong dự án như scss, typescript,...). Mặc định t không up nguyên folder chứa dependencies lên vì nó khá nặng.

## Để cập nhật các commit/dependencies mới:

`git pull` 

`pnpm update --latest`

Khuyến khích mỗi ngày làm 2 cái trên 1 lần để thường xuyên update các commit/deps mới.

## Để đưa commit mới lên repo:

`git push --force` hoặc dùng **Git/GitHub extension** trong VScode. (Sau khi cài Git tự khắc VScode sẽ tìm thấy)

## Để host trên localhost và bắt đầu code:

`npm run dev -- --open`. Svelte sẽ host file của dự án trên `localhost:5173` và mở browser.
`npm run dev` nếu muốn tự dùng browser khác để mở.

