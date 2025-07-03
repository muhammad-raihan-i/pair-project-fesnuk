tahap pengerjaan

1. di console, npm init -y done

2. install express pg ejs sequelize
`npm i express pg ejs sequelize`

3. kemudian install setting CLI
`npm i -D sequelize-cli`

4. buat file `.gitignore` untuk mengignore folder node_modules

5. initialize sequelize
`npx sequelize init`
6. masuk ke config/config.json untuk edit USERNAME, PASSWORD, dan NAMA DATABASE
(port isi localhost dan dialect isi postgres)

7. buat model dengan sequelize
`npx sequelize model:create --name (NamaTabel) --attributes (attribute1:value1,attribute2:value2...)`
--name (spasi) NamaTabel (nama tabel di sequelize: PASCAL SINGULAR)
(bukan kayak biasanya yg pascal plural)
--attributes mirip OBJECT tapi dilarang ada spasi sebelum/setelah koma atau sebelum/setelah titikdua
nanti akan ada folder baru dan file baru yaitu MODEL dan MIGRATIONS

8. run semua file migrations (`node migrations/123456789_example.js`)

9. jalankan (ini namanya apa gatau)
`npx sequelize db:migrate`

10. add kolom yang tidak dilist
`npx sequelize migration:create --name add-column-(namaKolom)-to-(Tabel)`
nanti ada file baru di migration

11. edit custom file migration
masuk ke file baru di migration
up: isi pake addColumn
down: isi pake removeColumn

12. jalankan ini lagi untuk menambah kolom:
`npx sequelize db:migrate`

13. buat file seeding untuk data yg ada JSONnya/data dummy:
`npx sequelize seed:create --name seed-Tabel`

14. edit file seeder:
import FS untuk operasi JSON

---fungsi up---
load file JSON yang ada di file
ubah JSON menjadi Array of Object (disingkat AofO)
kemudian hapus property ID dari AofO
tambahkan `createdAt` dan `updatedAt` di AofO (nama harus sesuai)
bulk insert ke Tabel

---fungsi down---
bulk delete ke tabel

run seeder

15. finalize seeding
`npx sequelize db:seed:all`

16. bikin validasi data
caranya: masuk ke folder models -> edit di MyTable.init
nanti ada object, value stringnya diubah ke object juga
DataType diubah ke type:DataType,
terus tambah entry object allowNull:false, sama validation:{object}

17. bikin connection data
cara: masuk ke models -> tableName -> static associate
hasOne
hasMany
belongsTo
belongsToMany

18. buat app.js untuk load semua hal. copas aja dari
`https://expressjs.com/en/guide/routing.html`

tapi nanti tambahin juga app set view engine dan app use urlencoded false

lalu tambahkan router (yang require router), dan masukkan `app.use router` juga di bawah

19. buat router: import class Controller dan export variabel router. sesuaikan dengan soal

====SELAMAT DATANG DI DIMENSI CONTROLLER====

20. buat controller berdasarkan link dari router

dunia get ---di benua TRY
create = (ada response.render) (ada if error)
read = findAll (ada response.render) (ada search)
update = (ada response.render) (ada if error)
delete = destroy

dunia post ---di benua TRY
create = TableName.create
update = TableName.update
dunia post ---di benua CATCH
create,update = ambil error.name "SequelizeValidationError"
lalu ambil error.errors dan tampilkan di query (muncul di get)

fungsi2 kayak findAll, destroy, create, update itu bisa diisi
array of object
atau
object

21. buat EJS di VIEWS (nama folder WAJIB "views")
`<%= %> -> buat naro isi tulisan`
`<% %> -> buat naro forEach atau if`
`<%- %> -> buat naro navbar atau CSS (kalau waktu masih cukup)`

22. buat get read (CONTROLLER)
assign semua isi request
mungkin butuh request params (kalau di routes ada /:)
tampilkan semua data (kalo disuruh, include tabel lain di dalem function findAll)
render EJSnya dan include data hasil findAll
load juga semua query (untuk search)

23. buat halaman read (VIEWS)
ubah title, masukkan CSS, NAVBAR, dkk pake <%- xxx %> di BAGIAN HEAD BUKAN BODY
tulis h1 sesuai nama tabel
buat bagian search pakai FORM method GET
buat tabel dengan forEach pakai <% %>. TR: ROW. TH: HEAD. TD: DATA

24. buat get create dan post create (CONTROLLER)
get create:
mungkin butuh request params (kalau di routes ada /:)
ambil semua query (tampilan error validasi)
render
post create: ---try---
ambil semua request body
masukkan ke Table.create()
post create: --catch--
ambil property errors dari error
response.send, terus redirect ke get

25. buat halaman create (VIEWS)
ubah title, masukkan CSS, NAVBAR, dkk pake <%- xxx %> di BAGIAN HEAD BUKAN BODY
tulis h1 sesuai nama tabel
buat tag P untuk isi error. gunakan if errors truthy.
buat FORM method POST
isian form:
input type text -> tidak punya teman belakang
input date -> date
select option -> dropdown
input radio
textarea -> describe

26. buat get update dan post update
get update:
mungkin butuh request params (kalau di routes ada /:)
ambil semua query dan semua data untuk populate
render (dan ambil data populate)
post create: ---try---
ambil semua request body
masukkan ke Table.update()
post create: --catch--
ambil property errors dari error
response.send, terus redirect ke get

27. buat halaman update (VIEWS)
ubah title, masukkan CSS, NAVBAR, dkk pake <%- xxx %> di BAGIAN HEAD BUKAN BODY
tulis h1 sesuai nama tabel
buat tag P untuk isi error. gunakan if errors truthy.
buat FORM method POST

CARA POPULATE
input type text -> taro di VALUE
input date -> ubah format pake to ISO STRING terus masukin ke value
select option -> pake "SELECTED" dan "VALUE"
input radio -> pake CHECKED TRUE
textarea -> taro di antara tag

28. buat get delete
mungkin butuh request params (kalau di routes ada /:)
destroy yg idnya sama (Table destroy)

29. CSS (BONUS ROUND)
format file EJS bukan CSS
ntar dihimpit sama tag STYLE (lebih mirip internal css di html)
buat narget tag langsung kurung kurawal
buat kelas pake titik
buat target id tertentu pake hashtag