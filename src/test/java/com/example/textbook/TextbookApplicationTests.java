package com.example.textbook;

import org.apache.commons.compress.archivers.ArchiveEntry;
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
    public void testApacheZip() throws IOException {
        Resource resource = ctx.getResource("classpath:static");
        File[] files = resource.getFile().listFiles();
        try (FileOutputStream fo = new FileOutputStream("test.zip"); ArchiveOutputStream o = new ZipArchiveOutputStream(fo)) {
            createZipArchiveEntry(null, files, o);
        }
    }

    private void createZipArchiveEntry(String directoryName, File[] files, ArchiveOutputStream o) throws IOException {
        for (File f : files) {
            if (f.getName().endsWith(".html") && !f.getName().equals("textbook-front.html"))
                continue;
            if (f.getName().endsWith(".js") && f.getName().startsWith("spa"))
                continue;
            String newDirectoryName = directoryName == null ? f.getName() : directoryName + "/" + f.getName();
            ArchiveEntry entry = o.createArchiveEntry(f, newDirectoryName);
            o.putArchiveEntry(entry);
            if (f.isFile()) {
                if (f.getName().equals("textbook.js")) {
                    BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(f)));
                    String data;
                    StringBuilder sb = new StringBuilder();
                    while ((data = br.readLine()) != null) {
                        sb.append(data.replaceAll("remote", "local")).append("\n");
                    }
                    try (InputStream i = new ByteArrayInputStream(sb.toString().getBytes())) {
                        IOUtils.copy(i, o);
                    }
                    continue;
                }
                try (InputStream i = Files.newInputStream(f.toPath())) {
                    IOUtils.copy(i, o);
                }
            }
            o.closeArchiveEntry();
            if (f.isDirectory()) {
                createZipArchiveEntry(newDirectoryName, f.listFiles(), o);
            }
        }
    }

}
