# NOTE KHI LÀM VIỆC VỚI REPO:

Để tránh vật lộn với bug, repo này sẽ có 4 branch riêng cho 4 người: 
- `adam`
- `tuan-minh`
- `lam-anh`
- `master`: Branch chính, chứa tất cả commit được finalize.

**Tất cả trừ CTO** (me xd) khi muốn push commit mới phải push vào branch riêng của mình trước. CTO sẽ test xem có vừa ý và có bug không, khi nào hợp lý mới merge vào master.

##### Để chuyển sang branch khác:

`git checkout {tên_branch}`

##### Để merge vào master:

```
git checkout master
git merge testing

Hoặc pull request ở trên đây.
```

##### Để undo lại về commit gần nhất:

`git reset --hard HEAD`

##### Để lấy tất cả commit từ master vào branch của mình:

```
git checkout master
git pull
git checkout {tên_branch_của_mình}
git rebase master
```

##### Để clone project về:

`git clone https://github.com/TvSSorA/wedoku` và mở directory đó bằng bất kỳ text editor mong muốn.

Sau khi clone, nhớ `pnpm install` để tải các dependencies (tool/extension dùng trong dự án như scss, typescript,...). Mặc định t không up nguyên folder chứa dependencies lên vì nó khá nặng. 

##### Để cập nhật các commit/dependencies mới:

`git pull` 

`pnpm update --latest`

Khuyến khích mỗi ngày làm 2 cái trên 1 lần để thường xuyên update các commit/deps.

##### Để đưa commit mới lên repo:

`git push` hoặc dùng **Git/GitHub extension** trong VScode. (Sau khi cài Git tự khắc VScode sẽ tìm thấy)

##### Để host trên localhost và bắt đầu code:

`npm run dev -- --open`. Svelte sẽ host file của dự án trên `localhost:5173` và mở browser.
`npm run dev` nếu muốn tự dùng browser khác để mở.

