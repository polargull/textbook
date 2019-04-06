package com.example.textbook;

import org.apache.commons.compress.archivers.ArchiveEntry;
import org.apache.commons.compress.archivers.ArchiveException;
import org.apache.commons.compress.archivers.ArchiveOutputStream;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.apache.commons.compress.utils.IOUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.Resource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.context.WebApplicationContext;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templateresolver.ServletContextTemplateResolver;

import java.io.*;
import java.nio.file.Files;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TextbookApplicationTests {
    @Autowired
    WebApplicationContext ctx;

    @Test
    public void testLoadStaticsFile() {
        ServletContextTemplateResolver templateResolver = new ServletContextTemplateResolver(ctx.getServletContext());
        templateResolver.setSuffix(".html");
        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);  //设置模板解析器
        Context ctx = new Context();
        String home = templateEngine.process("404", ctx);
        System.out.println(home);
    }

    @Test
    public void testZipFile() throws IOException {
        int num;
        byte[] buf = new byte[1024];
        Resource resource = ctx.getResource("classpath:static");
        try (FileOutputStream fout = new FileOutputStream("test.rar"); ZipOutputStream zout = new ZipOutputStream(fout)) {
            for (File file : resource.getFile().listFiles(file -> file.isFile())) {
                ZipEntry zipEntry = new ZipEntry(file.getPath());
                zout.putNextEntry(zipEntry);
                System.out.println(file.getName());
                try (FileInputStream fin = new FileInputStream(file.getPath())) {
                    while ((num = fin.read(buf)) != -1) {
                        zout.write(buf, 0, num);
                    }
                }
            }
        }
    }

    @Test
    public void testApacheZip() throws IOException, ArchiveException {
        Resource resource = ctx.getResource("classpath:static");
        File[] files = resource.getFile().listFiles(file -> file.isFile());
        try (FileOutputStream fo = new FileOutputStream("test.zip"); ArchiveOutputStream o = new ZipArchiveOutputStream(fo)) {
            for (File f : files) {
                ArchiveEntry entry = o.createArchiveEntry(f, f.getName());
                o.putArchiveEntry(entry);
                if (f.isFile()) {
                    try (InputStream i = Files.newInputStream(f.toPath())) {
                        IOUtils.copy(i, o);
                    }
                }
            }
        }
    }

}
