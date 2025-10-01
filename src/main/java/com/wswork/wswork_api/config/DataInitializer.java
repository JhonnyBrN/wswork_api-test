package com.wswork.wswork_api.config;

import com.wswork.wswork_api.entity.Marca;
import com.wswork.wswork_api.entity.Modelo;
import com.wswork.wswork_api.repository.MarcaRepository;
import com.wswork.wswork_api.repository.ModeloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private MarcaRepository marcaRepository;

    @Autowired
    private ModeloRepository modeloRepository;

    @Override
    public void run(String... args) throws Exception {

        modeloRepository.deleteAll();
        marcaRepository.deleteAll();

        Marca chevrolet = new Marca();
        chevrolet.setNome_marca("Chevrolet");

        Marca fiat = new Marca();
        fiat.setNome_marca("Fiat");
        
        Marca hyundai = new Marca();
        hyundai.setNome_marca("Hyundai");

        Marca volkswagen = new Marca();
        volkswagen.setNome_marca("Volkswagen");

        Marca toyota = new Marca();
        toyota.setNome_marca("Toyota");

        Marca jeep = new Marca();
        jeep.setNome_marca("Jeep");

        marcaRepository.saveAll(Arrays.asList(chevrolet, fiat, hyundai, volkswagen, toyota, jeep));
        
        Modelo onix = new Modelo();
        onix.setNome("Onix");
        onix.setValor_fipe(75000.0);
        onix.setMarca(chevrolet);

        Modelo tracker = new Modelo();
        tracker.setNome("Tracker");
        tracker.setValor_fipe(115000.0);
        tracker.setMarca(chevrolet);

        Modelo strada = new Modelo();
        strada.setNome("Strada");
        strada.setValor_fipe(95000.0);
        strada.setMarca(fiat);

        Modelo argo = new Modelo();
        argo.setNome("Argo");
        argo.setValor_fipe(78000.0);
        argo.setMarca(fiat);

        // Hyundai
        Modelo hb20 = new Modelo();
        hb20.setNome("HB20");
        hb20.setValor_fipe(76000.0);
        hb20.setMarca(hyundai);

        Modelo creta = new Modelo();
        creta.setNome("Creta");
        creta.setValor_fipe(125000.0);
        creta.setMarca(hyundai);
        

        modeloRepository.saveAll(Arrays.asList(onix, tracker, strada, argo, hb20, creta));

        System.out.println(">>> ✅ Banco de dados populado com dados iniciais via CommandLineRunner <<<");
    }
}