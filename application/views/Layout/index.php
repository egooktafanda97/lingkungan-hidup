<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" name="viewport">
    <title>Admin Page Retribusi</title>
    <link rel="stylesheet" href="<?= base_url('assets/template/dist/modules/bootstrap/css/bootstrap.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/template/dist/modules/ionicons/css/ionicons.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/template/dist/modules/fontawesome/web-fonts-with-css/css/fontawesome-all.min.css') ?>">

    <link rel="stylesheet" href="<?= base_url('assets/template/dist/css/demo.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/template/dist/css/style.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/template/dist/modules/toastr/build/toastr.min.css') ?>">
    <link media="all" rel="stylesheet" href="<?= base_url('assets/lib/jquery-dynatable/jquery.dynatable.css') ?>" />
    <link rel="stylesheet" media="all" href="<?= base_url('assets/css/style.css') ?>" />
    <link rel="icon" href="<?= base_url("assets/img/logo/logo.ico") ?>" type="image/x-icon" />
    <?php !empty($style) ? $this->load->view("page/" . $style) : "" ?>
    <script>
        localStorage.setItem("web_url", `<?= base_url() ?>`);
        localStorage.setItem("base_url", "<?= base_url("rest/") ?>");
    </script>
</head>

<body>
    <div id="app">
        <div class="main-wrapper">
            <div class="navbar-bg"></div>
            <nav class="navbar navbar-expand-lg main-navbar">
                <form class="form-inline mr-auto">
                    <ul class="navbar-nav mr-3">
                        <li><a href="#" data-toggle="sidebar" class="nav-link nav-link-lg"><i class="ion ion-navicon-round"></i></a></li>
                        <li><a href="#" data-toggle="search" class="nav-link nav-link-lg d-sm-none"><i class="ion ion-search"></i></a></li>
                    </ul>
                    <!-- <div class="search-element">
                        <input class="form-control" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn" type="submit"><i class="ion ion-search"></i></button>
                    </div> -->
                </form>
                <ul class="navbar-nav navbar-right top-bar">
                    <li class="dropdown"><a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle nav-link-lg">
                            <i class="ion ion-android-person d-lg-none"></i>
                            <div class="d-sm-none d-lg-inline-block">Admin</div>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a href="<?= base_url('User/profile') ?>" class="dropdown-item has-icon">
                                <i class="ion ion-android-person"></i> Profile
                            </a>
                            <a href="<?= base_url('User/index') ?>" class="dropdown-item has-icon">
                                <i class="ion ion-android-person"></i> Management User
                            </a>
                            <a target="_blank" href="<?= base_url('assets/android/aplikasi-jurupungut-v1.0.apk') ?>" class="dropdown-item has-icon">
                                <i class="fa fa-android"></i> Aplikasi Jurupungut
                            </a>
                            <a style="cursor: pointer;" class="dropdown-item has-icon logout">
                                <i class="ion ion-log-out"></i> Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
            <?php $this->load->view('Layout/router') ?>
            <div class="main-content">

                <?php $this->load->view('page/' . $page) ?>

            </div>
            <footer class="main-footer">
                <div class="footer-left">
                    <!-- Copyright &copy; <?= date('Y') ?> <div class="bullet"></div> Design By <a href="https://multinity.com/">Multinity</a> -->
                </div>
                <div class="footer-right"></div>
            </footer>
        </div>
    </div>
    <div class='modal-costum-container hide-mod'></div>
    <script src="<?= base_url('assets/template/') ?>dist/modules/jquery.min.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/modules/popper.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/modules/tooltip.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/modules/bootstrap/js/bootstrap.min.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/modules/nicescroll/jquery.nicescroll.min.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/modules/scroll-up-bar/dist/scroll-up-bar.min.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/js/sa-functions.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/modules/toastr/build/toastr.min.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/modules/gmaps.js"></script>
    <script>
        // init map
        var simple_map = new GMaps({
            div: '#simple-map',
            lat: -6.5637928,
            lng: 106.7535061
        })
    </script>
    <script src="<?= base_url('assets/template/') ?>dist/js/scripts.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/js/custom.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/js/demo.js"></script>
    <script src="<?= base_url('assets/lib/jquery-dynatable/jquery.dynatable.js') ?>"></script>
    <?php !empty($script) ? $this->load->view("page/" . $script) : "" ?>
    <script>
        $(".logout").click(function() {
            localStorage.removeItem("token");
            window.location.href = "<?= base_url('Login/index') ?>";
        });
        const dataInit = localStorage.getItem("user");

        if (dataInit) {
            const data = JSON.parse(dataInit);
            console.log(data);
            $(".user-name").html(data.nama);
            $(".user-role").html(data.role);
            $(".sidebar-user-picture>img").attr("src", "<?= base_url('rest/public/img/users/') ?>" + data.foto);
        }
    </script>


</body>

</html>