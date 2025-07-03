page list:

/login -> login
/register -> buat akun
/home -> semua postingan bisa dilihat di sini dan bisa filter by
- content
- author
- tag (ini harus include PostTags)
/profiles/:id -> lihat profile orang lain
/account -> pengaturan account
/post -> buat postingan

get /login getLogin access
post /login postLogin access

get /register getRegister create
post /register postRegister create

get /home getHome read

get /profile/me getMyProfile read
get /profile/me/edit getEditMyProfile update
post /profile/me/edit postEditMyProfile update
get /profile/:userId getReadOthersProfile read (bisa baca punya orang lain)

get /account/:userId getEditAccount update
post /account/:userId postEditAccount update

get /post/add getAddPost create
post /post/add postAddPost create
get /post/:id/edit getEditPost update
post /post/:id/edit postEditPost update
get /post/:id/delete getDeletePost delete

