<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Retribusi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <center>
                    <table width="100%" align="center" cellspacing="1" cellpadding="1">
                        <tbody>
                            <tr>
                                <td width="70px">
                                    <img src="<?= base_url("assets/img/logo/logo.png") ?>" width="60" />
                                </td>
                                <td>
                                    <br />
                                    <center>
                                        <h1 style="color: black;
                                                    font-size: 2vh !important;
                                                    text-transform: uppercase;
                                                    ">
                                            PEMERINTAH KABUPATEN PELALAWAN<br />
                                            DINAS LINGKUNGAN HIDUP.<br /><span>
                                                KOMPLEK PERKANTORAN BHAKTI PRAJA KABUATEN PELALAWAN
                                                <br />
                                                PANGKALAN KERINCI,28381
                                            </span>
                                        </h1>
                                    </center>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <hr />
                    <p style="color: black; font-size: 1.8vh">
                        KARTU PEMBAYARAN IURAN RETRIBUSI KEBERSIHAN<br />PERATURAN DAERAH
                        KABUPATEN PELALAWAN NO. 1 TAHUN 2019 TENTANG PERUBAHAN ATAS<br />
                        PERATURAN DAERAH KABUPATEN PELALAWAN NO. 1 TAHUN 2016 TENTANG
                        RETRIBUSI DAERAH
                    </p>
                </center>
                <br />
                <table class="w-100" style="font-size: 1.5vh;">
                    <tbody>
                        <tr>
                            <td style="width: 30%;">Kode Usaha</td>
                            <td style="width: 1%;">:</td>
                            <td><?= $usaha['kode'] ?? "-" ?></td>
                        </tr>
                        <tr>

                            <td style="width: 30%;">Nama Usaha</td>
                            <td style="width: 1%;">:</td>
                            <td><?= $usaha['nama_usaha'] ?? "-" ?></td>
                        </tr>
                        <tr>
                            <td style="width: 30%;">Jenis Usaha/Bangunan</td>
                            <td style="width: 1%;">:</td>
                            <td><?= $usaha['jenis_usaha'] ?? "-" ?></td>
                        </tr>
                        <tr>
                            <td style="width: 30%;">Alamat</td>
                            <td style="width: 1%;">:</td>
                            <td><?= $usaha['alamat'] ?? "-" ?></td>
                        </tr>
                        <tr>
                            <td style="width: 30%;">Besarnya Retribusi Perbulan</td>
                            <td style="width: 1%;">:</td>
                            <td><?= rupiah($this->db->get_where("type_usaha", ["id_tipe_usaha" => $usaha['id_tipe_usaha']])->row_array()['jumlah_retribusi']) ?? "-" ?></td>
                        </tr>
                    </tbody>
                </table>

                <!-- <table width="700px" align="center"cellspacing="1" cellpadding="1"">
              <tbody>
                
              </tbody>
           </table> -->
                <br>
                <div class="table-responsive" style="width: 100%;">
                    <table class="table table-bordered" style="font-size: 1.5vh;">
                        <thead>
                            <tr>
                                <th width="10">No</th>
                                <th width="50">Bulan</th>
                                <th width="50">Tanggal</th>
                                <th width="50">Jumlah Tagihan</th>
                                <th width="50">Jurupungut</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th width="10">No</th>
                                <th width="50">Bulan</th>
                                <th width="50">Tanggal Kutip</th>
                                <th width="50">Jumlah Tagihan</th>
                                <th width="50">Jurupungut</th>
                            </tr>
                        </tfoot>
                        <tbody id="contents">

                        </tbody>
                    </table>
                </div>

                <br />
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js" integrity="sha512-aVKKRRi/Q/YV+4mjoKBsE4x3H+BkegoM/em46NNlCqNTmUYADjBbeNefNxYV7giUp0VxICtqdrbqU7iVaeZNXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.2.1/axios.min.js" integrity="sha512-zJYu9ICC+mWF3+dJ4QC34N9RA0OVS1XtPbnf6oXlvGrLGNB8egsEzu/5wgG90I61hOOKvcywoLzwNmPqGAdATA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment-with-locales.min.js" integrity="sha512-42PE0rd+wZ2hNXftlM78BSehIGzezNeQuzihiBCvUEB3CVxHvsShF86wBWwQORNxNINlBPuq7rG4WWhNiTVHFg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <?php if (!empty($_GET['key'])) : ?>
        <script>
            moment.locale("id")
            const formatRupiah = (money) => {
                console.log(money);
                return new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                }).format(money);
            }
            const getRetribusi = async () => {
                const getter = await axios.get("<?= base_url("rest/api/retribusi/getRetribusiByKeyUsaha?key=" . $_GET['key']) ?>").catch((err) => {
                    console.log(err.response);
                });
                if (getter) {
                    const data = getter?.data;

                    var htmls = ``;
                    data.map((x, i) => {
                        var ins = `
                        <tr>
                            <td>${i +1}</td>
                            <td>${moment(x?.bulan).format("MMMM YYYY")}</td>
                            <td>${x?.retribusi?.tanggal_kutip ?? "-"}</td>
                            <td>${formatRupiah(x?.retribusi?.jumlah_tagihan??"0") ?? "-"}</td>
                            <td>${x?.retribusi?.user?.nama ?? "-"}</td>
                        </tr>
                        `;
                        htmls += ins;
                    });
                    $("#contents").html(htmls);

                }
            }
            getRetribusi();
        </script>
    <?php endif ?>
</body>

</html>