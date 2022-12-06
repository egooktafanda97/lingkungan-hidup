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
                <a href="<?= base_url('Dashboard/index') ?>"><i class="ion ion-speedometer"></i><span>DAHBOARD</span></a>
            </li>

            <li class="menu-header">Menu</li>
            <li class="active">
                <a href="#" class="has-dropdown"><i class="ion ion-ios-albums-outline"></i><span><strong>JURUPUNGUT</strong></span></a>
                <ul class="menu-dropdown">
                    <li class="<?= $this->uri->segment(1) == "Jurupungut" && $this->uri->segment(2) == "index" ? "active" : "" ?>"><a href="<?= base_url('Jurupungut/index') ?>"><i class=" ion ion-ios-circle-outline"></i>JURUPUNGUT</a></li>
                    <li class="<?= $this->uri->segment(1) == "Jurupungut" && $this->uri->segment(2) == "laporan" ? "active" : "" ?>"><a href="<?= base_url('Jurupungut/laporan') ?>"><i class=" ion ion-ios-circle-outline"></i>LAPORAN JURUPUNGUT</a></li>
                </ul>
            </li>
            <li class="active">
                <a href="#" class="has-dropdown"><i class="ion ion-ios-albums-outline"></i><span><strong>USAHA</strong></span></a>
                <ul class="menu-dropdown">
                    <li class="<?= $this->uri->segment(1) == "Usaha" && $this->uri->segment(2) == "index" ? "active" : "" ?>"><a href="<?= base_url('Usaha/index') ?>"><i class=" ion ion-ios-circle-outline"></i>DATA USAHA</a></li>
                    <li class="<?= $this->uri->segment(1) == "TypeUsaha" && $this->uri->segment(2) == "index" ? "active" : "" ?>"><a href="<?= base_url('TypeUsaha/index') ?>"><i class=" ion ion-ios-circle-outline"></i>TIPE USAHA</a></li>
                    <li class="<?= $this->uri->segment(1) == "Zona" && $this->uri->segment(2) == "index" ? "active" : "" ?>"><a href="<?= base_url('Zona/index') ?>"><i class="ion ion-ios-circle-outline"></i>WILAYAH</a></li>
                </ul>
            </li>
            <li class="active">
                <a href="#" class="has-dropdown"><i class="ion ion-ios-albums-outline"></i><span><strong>RETRIBUSI</strong></span></a>
                <ul class="menu-dropdown">
                    <li class="<?= $this->uri->segment(1) == "Retribusi" && $this->uri->segment(2) == "index" ? "active" : "" ?>"><a href="<?= base_url('Retribusi/index') ?>"><i class="ion ion-ios-circle-outline"></i>LAPORAN RETRIBUSI</a></li>
                    <li class="<?= $this->uri->segment(1) == "RetribusiNpwrd" && $this->uri->segment(2) == "index" ? "active" : "" ?>"><a href="<?= base_url('RetribusiNpwrd/index') ?>"><i class="ion ion-ios-circle-outline"></i>NPWRD</a></li>
                    <!-- <li><a href="components.html"><i class="ion ion-ios-circle-outline"></i> Informasi Peta</a></li> -->
                    <!-- <li class="<?= $this->uri->segment(1) == "Zona" && $this->uri->segment(2) == "index" ? "active" : "" ?>"><a href="<?= base_url('Zona/index') ?>"><i class="ion ion-ios-circle-outline"></i>Wilayah</a></li> -->
                </ul>
            </li>
            <li class="active">
                <a href="#" class="has-dropdown"><i class="ion ion-ios-albums-outline"></i><span><strong>TIMBANGAN TPA</strong></span></a>
                <ul class="menu-dropdown">
                    <li class="<?= $this->uri->segment(1) == "Timbangan" && $this->uri->segment(2) == "scales" ? "active" : "" ?>"><a href="<?= base_url('Timbangan/scales') ?>"><i class="ion ion-ios-circle-outline"></i>Timbangan</a></li>
                    <!-- <li><a href="components.html"><i class="ion ion-ios-circle-outline"></i>Laporan Timbangan</a></li> -->
                    <li class="<?= $this->uri->segment(1) == "Timbangan" && $this->uri->segment(2) == "truck" ? "active" : "" ?>"><a href="<?= base_url('Timbangan/truck') ?>"><i class="ion ion-ios-circle-outline"></i>Truck</a></li>
                    <li class="<?= $this->uri->segment(1) == "Timbangan" && $this->uri->segment(2) == "sender" ? "active" : "" ?>"><a href="<?= base_url('Timbangan/sender') ?>"><i class="ion ion-ios-circle-outline"></i>Lokasi Sampah</a></li>
                </ul>
            </li>
        </ul>
    </aside>
</div>