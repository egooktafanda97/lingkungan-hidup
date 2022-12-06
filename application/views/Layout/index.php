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
                            <a style="cursor: pointer;" class="dropdown-item has-icon logout">
                                <i class="ion ion-log-out"></i> Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
            <div class="main-sidebar">
                <aside id="sidebar-wrapper">
                    <div class="sidebar-brand">
                        <a href="index.html">PELALAWAN</a>
                    </div>
                    <div class="sidebar-user">
                        <div class="sidebar-user-picture">
                            <img alt="image" src="<?= base_url('assets/img/user/default.jpg') ?>">
                        </div>
                        <div class="sidebar-user-details">
                            <div class="user-name">admin</div>
                            <div class="user-role">
                                Administrator
                            </div>
                        </div>
                    </div>
                    <ul class="sidebar-menu">
                        <li class="menu-header">Dashboard</li>
                        <li class="<?= $this->uri->segment(1) == "Dashboard" ? "active" : "" ?>">
                            <a href="<?= base_url('Dashboard/index') ?>"><i class="ion ion-speedometer"></i><span>Dashboard</span></a>
                        </li>

                        <li class="menu-header">Menu</li>
                        <li class="<?= $this->uri->segment(1) == "Jurupungut" ? "active" : "" ?>">
                            <a href="#" class="has-dropdown"><i class="ion ion-ios-albums-outline"></i><span>Jurupungut</span></a>
                            <ul class="menu-dropdown">
                                <li class="<?= $this->uri->segment(2) == "index" ? "active" : "" ?>"><a href="<?= base_url('Jurupungut/index') ?>"><i class=" ion ion-ios-circle-outline"></i>Juru Pungut</a></li>
                                <li class="<?= $this->uri->segment(2) == "laporan" ? "active" : "" ?>"><a href="<?= base_url('Jurupungut/laporan') ?>"><i class=" ion ion-ios-circle-outline"></i>Laporan Jurupungut</a></li>
                            </ul>
                        </li>
                        <li class="<?= $this->uri->segment(1) == "Usaha" ||  $this->uri->segment(1) == "TypeUsaha"  || $this->uri->segment(1) == "Zona"  ? "active" : "" ?>">
                            <a href="#" class="has-dropdown"><i class="ion ion-ios-albums-outline"></i><span>Usaha</span></a>
                            <ul class="menu-dropdown">
                                <li class="<?= $this->uri->segment(1) == "Usaha" && $this->uri->segment(2) == "index" ? "active" : "" ?>"><a href="<?= base_url('Usaha/index') ?>"><i class=" ion ion-ios-circle-outline"></i>Data Usaha</a></li>
                                <li class="<?= $this->uri->segment(1) == "TypeUsaha" && $this->uri->segment(2) == "index" ? "active" : "" ?>"><a href="<?= base_url('TypeUsaha/index') ?>"><i class=" ion ion-ios-circle-outline"></i>Tipe Usaha</a></li>
                                <li class="<?= $this->uri->segment(1) == "Zona" && $this->uri->segment(2) == "index" ? "active" : "" ?>"><a href="<?= base_url('Zona/index') ?>"><i class="ion ion-ios-circle-outline"></i>Wilayah</a></li>
                            </ul>
                        </li>
                        <li class="<?= $this->uri->segment(1) == "Retribusi" || $this->uri->segment(1) == "RetribusiNpwrd" ? "active" : "" ?>">
                            <a href="#" class="has-dropdown"><i class="ion ion-ios-albums-outline"></i><span>Retribusi</span></a>
                            <ul class="menu-dropdown">
                                <li class="<?= $this->uri->segment(1) == "Retribusi" && $this->uri->segment(2) == "index" ? "active" : "" ?>"><a href="<?= base_url('Retribusi/index') ?>"><i class="ion ion-ios-circle-outline"></i>Laporan Retribusi</a></li>
                                <li class="<?= $this->uri->segment(1) == "RetribusiNpwrd" && $this->uri->segment(2) == "index" ? "active" : "" ?>"><a href="<?= base_url('RetribusiNpwrd/index') ?>"><i class="ion ion-ios-circle-outline"></i>NPWRD</a></li>
                                <!-- <li><a href="components.html"><i class="ion ion-ios-circle-outline"></i> Informasi Peta</a></li> -->
                                <!-- <li class="<?= $this->uri->segment(1) == "Zona" && $this->uri->segment(2) == "index" ? "active" : "" ?>"><a href="<?= base_url('Zona/index') ?>"><i class="ion ion-ios-circle-outline"></i>Wilayah</a></li> -->
                            </ul>
                        </li>
                        <li class="<?= $this->uri->segment(1) == "Retribusi" || $this->uri->segment(1) == "Timbangan" ? "active" : "" ?>">
                            <a href="#" class="has-dropdown"><i class="ion ion-ios-albums-outline"></i><span>Timbangan</span></a>
                            <ul class="menu-dropdown">
                                <li class="<?= $this->uri->segment(1) == "Timbangan" && $this->uri->segment(2) == "scales" ? "active" : "" ?>"><a href="<?= base_url('Timbangan/scales') ?>"><i class="ion ion-ios-circle-outline"></i>Timbangan</a></li>
                                <!-- <li><a href="components.html"><i class="ion ion-ios-circle-outline"></i>Laporan Timbangan</a></li> -->
                                <li class="<?= $this->uri->segment(1) == "Timbangan" && $this->uri->segment(2) == "truck" ? "active" : "" ?>"><a href="<?= base_url('Timbangan/truck') ?>"><i class="ion ion-ios-circle-outline"></i>Truck</a></li>
                                <li class="<?= $this->uri->segment(1) == "Timbangan" && $this->uri->segment(2) == "sender" ? "active" : "" ?>"><a href="<?= base_url('Timbangan/sender') ?>"><i class="ion ion-ios-circle-outline"></i>Lokasi Sampah</a></li>
                            </ul>
                        </li>
                        <!-- <li>
                            <a href="#" class="has-dropdown"><i class="ion ion-ios-albums-outline"></i><span>Setting</span></a>
                            <ul class="menu-dropdown">
                                <li><a href="<?= base_url('Retribusi/index') ?>"><i class="ion ion-ios-circle-outline"></i>Jenis Usaha</a></li>
                                <li><a href="components.html"><i class="ion ion-ios-circle-outline"></i>Data Zona</a></li>
                                <li><a href="components.html"><i class="ion ion-ios-circle-outline"></i>Management User</a></li>
                            </ul>
                        </li> -->
                        <!-- <li>
                            <a href="#" class="has-dropdown"><i class="ion ion-ios-albums-outline"></i><span>Components</span></a>
                            <ul class="menu-dropdown">
                                <li><a href="general.html"><i class="ion ion-ios-circle-outline"></i> Basic</a></li>
                                <li><a href="components.html"><i class="ion ion-ios-circle-outline"></i> Main Components</a></li>
                                <li><a href="buttons.html"><i class="ion ion-ios-circle-outline"></i> Buttons</a></li>
                                <li><a href="toastr.html"><i class="ion ion-ios-circle-outline"></i> Toastr</a></li>
                            </ul>
                        </li> -->
                    </ul>
                    <!-- <div class="p-3 mt-4 mb-4">
                        <a href="http://stisla.multinity.com/" class="btn btn-danger btn-shadow btn-round has-icon has-icon-nofloat btn-block">
                            <i class="ion ion-help-buoy"></i>
                            <div>-</div>
                        </a>
                    </div> -->
                </aside>
            </div>
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