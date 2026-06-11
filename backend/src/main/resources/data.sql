-- ==========================================
-- POPULANDO A TABELA DE BAIRROS (NÓS)
-- ==========================================
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Jardim América', true, 544.46, 337.81 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Jardim América');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Centro', true, 532.97, 468.69 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Centro');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Setor Leste', false, 793.82, 604.48 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Setor Leste');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Vila Nova', true, 261.86, 632.99 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Vila Nova');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Alto da Serra', false, 161.13, 589.97 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Alto da Serra');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Setor Oeste', false, -137.1, 677.87 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Setor Oeste');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Distrito Industrial', false, 10.74, 651.75 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Distrito Industrial');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Residencial Esperança', false, -277.11, 839.92 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Residencial Esperança');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Recanto Verde', false, 360.41, 1250.3 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Recanto Verde');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Ecoparque Sul', false, 341.89, 716.12 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Ecoparque Sul');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Nova Alvorada', false, 560.24, 1016.8 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Nova Alvorada');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Setor das Palmeiras', false, 220.41, 121.43 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Setor das Palmeiras');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Colina Azul', false, 708.24, 521.66 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Colina Azul');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Bela Vista', true, -3.41, 274.19 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Bela Vista');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Morada do Sol', false, 421.82, 206.16 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Morada do Sol');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Setor Central II', true, 714.75, 942.03 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Setor Central II');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Lago Azul', false, -55.17, 507.05 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Lago Azul');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Residencial Florença', false, 226.75, 786.14 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Residencial Florença');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Setor Industrial Norte', false, 541.74, 747.25 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Setor Industrial Norte');
INSERT INTO bairros (nome_bairro, tem_base, pos_x, pos_y) SELECT 'Vale do Cerrado', true, 413.31, 981.52 WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE nome_bairro = 'Vale do Cerrado');

-- ==========================================
-- POPULANDO A TABELA DE RUAS (ARESTAS)
-- ==========================================
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 9, 16, 6.4 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 9 AND id_bairro_destino = 16);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 15, 19, 8.3 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 15 AND id_bairro_destino = 19);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 17, 7, 1.2 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 17 AND id_bairro_destino = 7);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 3, 5, 12.2 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 3 AND id_bairro_destino = 5);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 12, 4, 14 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 12 AND id_bairro_destino = 4);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 13, 7, 9.2 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 13 AND id_bairro_destino = 7);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 13, 6, 19.2 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 13 AND id_bairro_destino = 6);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 5, 9, 13.2 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 5 AND id_bairro_destino = 9);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 16, 3, 3.4 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 16 AND id_bairro_destino = 3);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 8, 10, 12.8 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 8 AND id_bairro_destino = 10);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 20, 1, 14.4 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 20 AND id_bairro_destino = 1);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 14, 3, 18.1 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 14 AND id_bairro_destino = 3);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 2, 18, 1.9 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 2 AND id_bairro_destino = 18);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 6, 11, 15.7 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 6 AND id_bairro_destino = 11);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 1, 17, 14.5 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 1 AND id_bairro_destino = 17);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 3, 4, 19.2 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 3 AND id_bairro_destino = 4);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 14, 19, 18.9 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 14 AND id_bairro_destino = 19);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 15, 18, 18.5 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 15 AND id_bairro_destino = 18);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 20, 2, 14.7 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 20 AND id_bairro_destino = 2);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 15, 20, 12.7 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 15 AND id_bairro_destino = 20);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 17, 15, 7.9 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 17 AND id_bairro_destino = 15);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 4, 12, 6.4 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 4 AND id_bairro_destino = 12);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 5, 15, 8.6 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 5 AND id_bairro_destino = 15);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 6, 2, 13.4 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 6 AND id_bairro_destino = 2);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 14, 15, 9.4 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 14 AND id_bairro_destino = 15);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 9, 3, 18.7 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 9 AND id_bairro_destino = 3);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 18, 7, 1.7 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 18 AND id_bairro_destino = 7);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 13, 7, 17.5 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 13 AND id_bairro_destino = 7);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 18, 9, 9 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 18 AND id_bairro_destino = 9);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 15, 11, 18.3 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 15 AND id_bairro_destino = 11);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 3, 4, 3 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 3 AND id_bairro_destino = 4);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 7, 2, 13.9 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 7 AND id_bairro_destino = 2);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 20, 4, 7.7 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 20 AND id_bairro_destino = 4);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 5, 16, 14.3 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 5 AND id_bairro_destino = 16);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 13, 4, 12.8 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 13 AND id_bairro_destino = 4);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 1, 16, 13.4 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 1 AND id_bairro_destino = 16);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 14, 3, 14.3 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 14 AND id_bairro_destino = 3);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 2, 6, 16.7 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 2 AND id_bairro_destino = 6);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 11, 8, 16.6 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 11 AND id_bairro_destino = 8);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 11, 10, 4.6 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 11 AND id_bairro_destino = 10);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 4, 1, 7 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 4 AND id_bairro_destino = 1);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 11, 7, 14.4 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 11 AND id_bairro_destino = 7);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 13, 5, 6.2 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 13 AND id_bairro_destino = 5);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 9, 20, 2.7 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 9 AND id_bairro_destino = 20);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 13, 15, 8.3 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 13 AND id_bairro_destino = 15);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 17, 13, 16.3 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 17 AND id_bairro_destino = 13);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 10, 14, 7.9 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 10 AND id_bairro_destino = 14);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 8, 1, 17.9 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 8 AND id_bairro_destino = 1);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 9, 2, 19.3 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 9 AND id_bairro_destino = 2);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 16, 17, 18.4 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 16 AND id_bairro_destino = 17);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 6, 14, 9 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 6 AND id_bairro_destino = 14);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 2, 19, 5.1 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 2 AND id_bairro_destino = 19);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 6, 5, 1.3 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 6 AND id_bairro_destino = 5);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 2, 1, 1.4 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 2 AND id_bairro_destino = 1);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 20, 19, 3.7 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 20 AND id_bairro_destino = 19);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 20, 2, 6.5 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 20 AND id_bairro_destino = 2);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 4, 8, 13.1 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 4 AND id_bairro_destino = 8);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 4, 19, 3.8 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 4 AND id_bairro_destino = 19);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 16, 11, 2.8 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 16 AND id_bairro_destino = 11);
INSERT INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) SELECT 13, 16, 7.8 WHERE NOT EXISTS (SELECT 1 FROM ruas WHERE id_bairro_origem = 13 AND id_bairro_destino = 16);

-- ====================================
-- POPULANDO A TABELA DE AMBULANCIAS
-- ====================================
INSERT INTO ambulancias (placa, tipo, status, bairro_base_id) SELECT 'ZGN0P33', 'UTI', 'DISPONIVEL', 2 WHERE NOT EXISTS (SELECT 1 FROM ambulancias WHERE placa = 'ZGN0P33');
INSERT INTO ambulancias (placa, tipo, status, bairro_base_id) SELECT 'OVO7I93', 'BASICA', 'INATIVA', 20 WHERE NOT EXISTS (SELECT 1 FROM ambulancias WHERE placa = 'OVO7I93');
INSERT INTO ambulancias (placa, tipo, status, bairro_base_id) SELECT 'FFK9P80', 'UTI', 'DISPONIVEL', 4 WHERE NOT EXISTS (SELECT 1 FROM ambulancias WHERE placa = 'FFK9P80');
INSERT INTO ambulancias (placa, tipo, status, bairro_base_id) SELECT 'EKH7D24', 'UTI', 'DISPONIVEL', 2 WHERE NOT EXISTS (SELECT 1 FROM ambulancias WHERE placa = 'EKH7D24');
INSERT INTO ambulancias (placa, tipo, status, bairro_base_id) SELECT 'KHU8J74', 'UTI', 'DISPONIVEL', 14 WHERE NOT EXISTS (SELECT 1 FROM ambulancias WHERE placa = 'KHU8J74');
INSERT INTO ambulancias (placa, tipo, status, bairro_base_id) SELECT 'NBE8A41', 'UTI', 'DISPONIVEL', 16 WHERE NOT EXISTS (SELECT 1 FROM ambulancias WHERE placa = 'NBE8A41');
INSERT INTO ambulancias (placa, tipo, status, bairro_base_id) SELECT 'KZC1P62', 'BASICA', 'DISPONIVEL', 1 WHERE NOT EXISTS (SELECT 1 FROM ambulancias WHERE placa = 'KZC1P62');
INSERT INTO ambulancias (placa, tipo, status, bairro_base_id) SELECT 'VBF1I65', 'UTI', 'DISPONIVEL', 20 WHERE NOT EXISTS (SELECT 1 FROM ambulancias WHERE placa = 'VBF1I65');
INSERT INTO ambulancias (placa, tipo, status, bairro_base_id) SELECT 'DPL6V39', 'UTI', 'INATIVA', 1 WHERE NOT EXISTS (SELECT 1 FROM ambulancias WHERE placa = 'DPL6V39');
INSERT INTO ambulancias (placa, tipo, status, bairro_base_id) SELECT 'YED6Y11', 'UTI', 'INATIVA', 2 WHERE NOT EXISTS (SELECT 1 FROM ambulancias WHERE placa = 'YED6Y11');
INSERT INTO ambulancias (placa, tipo, status, bairro_base_id) SELECT 'NJZ5V31', 'BASICA', 'DISPONIVEL', 20 WHERE NOT EXISTS (SELECT 1 FROM ambulancias WHERE placa = 'NJZ5V31');

-- ====================================
-- POPULANDO A TABELA DE EQUIPES
-- ====================================
INSERT INTO equipes (ambulancia_id, ativo) SELECT 1, true WHERE NOT EXISTS (SELECT 1 FROM equipes WHERE ambulancia_id = 1);
INSERT INTO equipes (ambulancia_id, ativo) SELECT 4, true WHERE NOT EXISTS (SELECT 1 FROM equipes WHERE ambulancia_id = 4);
INSERT INTO equipes (ambulancia_id, ativo) SELECT 11, true WHERE NOT EXISTS (SELECT 1 FROM equipes WHERE ambulancia_id = 11);
INSERT INTO equipes (ambulancia_id, ativo) SELECT 7, true WHERE NOT EXISTS (SELECT 1 FROM equipes WHERE ambulancia_id = 7);
INSERT INTO equipes (ambulancia_id, ativo) SELECT 3, true WHERE NOT EXISTS (SELECT 1 FROM equipes WHERE ambulancia_id = 3);
INSERT INTO equipes (ambulancia_id, ativo) SELECT 6, true WHERE NOT EXISTS (SELECT 1 FROM equipes WHERE ambulancia_id = 6);
INSERT INTO equipes (ambulancia_id, ativo) SELECT 5, true WHERE NOT EXISTS (SELECT 1 FROM equipes WHERE ambulancia_id = 5);
INSERT INTO equipes (ambulancia_id, ativo) SELECT 8, true WHERE NOT EXISTS (SELECT 1 FROM equipes WHERE ambulancia_id = 8);

-- ====================================
-- POPULANDO A TABELA DE PROFISSIONAIS
-- ====================================
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Drauzio Varella', 'MEDICO', 'drauziovarella@gmail.com', true, 1 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'drauziovarella@gmail.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Meredith Grey', 'MEDICO', 'meredithzinha@yahoo.com', true, 5 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'meredithzinha@yahoo.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Dominic Toretto', 'CONDUTOR', 'toretto@toretto.com', true, 1 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'toretto@toretto.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Paula Teixeira', 'ENFERMEIRO', 'paulinhadopagode@gmail.com', true, 1 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'paulinhadopagode@gmail.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Maria José', 'ENFERMEIRO', 'maryjoseph@outlook.com', true, 4 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'maryjoseph@outlook.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Ronaldo Filho', 'MEDICO', 'rorofilho@outlook.com', true, 6 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'rorofilho@outlook.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Gabriela Lisboa', 'ENFERMEIRO', 'gabrielisboa@gmail.com', true, 3 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'gabrielisboa@gmail.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Juremaldo Sales', 'CONDUTOR', 'juremildo@outlook.com', true, 3 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'juremildo@outlook.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Rolando Barros', 'CONDUTOR', 'fuirolando@yahoo.com.br', true, 4 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'fuirolando@yahoo.com.br');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Um Dois Tres de Oliveira', 'CONDUTOR', 'umdoistres@gmail.com', true, 5 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'umdoistres@gmail.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Joana Darc', 'ENFERMEIRO', 'joanadarc@joana.com', true, 5 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'joanadarc@joana.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Luiz Felipe', 'ENFERMEIRO', 'felipito@outlook.com', true, 6 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'felipito@outlook.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Jessica Ferreira', 'CONDUTOR', 'jaacaboujessica@gmail.com', true, 6 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'jaacaboujessica@gmail.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Camila Cabo', 'MEDICO', 'milacabo@gmail.com', true, 7 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'milacabo@gmail.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Bianca Biquestre', 'ENFERMEIRO', 'bibiquestre@yahoo.com.br', true, 8 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'bibiquestre@yahoo.com.br');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Julia Souza', 'CONDUTOR', 'jusouza@gmail.com', true, 7 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'jusouza@gmail.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Ameinda Silva', 'ENFERMEIRO', 'ameinda@gmail.com', true, 7 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'ameinda@gmail.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Pedro Lucas', 'MEDICO', 'pedrolucas@outlook.com', true, 2 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'pedrolucas@outlook.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Pericles', 'CONDUTOR', 'periclys@outlook.com', true, 2 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'periclys@outlook.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Neuma Moura', 'ENFERMEIRO', 'neuminha@yahoo.com.br', true, 2 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'neuminha@yahoo.com.br');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Davi Augusto', 'MEDICO', 'daviaug23@gmail.com', true, 8 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'daviaug23@gmail.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Marcelo Ferreira', 'CONDUTOR', 'celoferreira@yahoo.com', true, 8 WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'celoferreira@yahoo.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Larissa Santana', 'MEDICO', 'larisantana@gmail.com', true, null WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'larisantana@gmail.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Leila Araujo', 'ENFERMEIRO', 'araujoleila@gmail.com', true, null WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'araujoleila@gmail.com');
INSERT INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) SELECT 'Amanda Sousa', 'CONDUTOR', 'mandexsousa@hotmail.com', true, null WHERE NOT EXISTS (SELECT 1 FROM profissionais WHERE email_contato = 'mandexsousa@hotmail.com');

-- ====================================
-- POPULANDO A TABELA DE OCORRENCIAS
-- ====================================
INSERT INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) SELECT 'Muito sono', 'MEDIA', 1, 'CONCLUIDA', '', '2025-12-07 00:18:11.338847 +00:00', 806 WHERE NOT EXISTS (SELECT 1 FROM ocorrencias WHERE data_hora_abertura = '2025-12-07 00:18:11.338847 +00:00' AND tipo_ocorrencia = 'Muito sono');
INSERT INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) SELECT 'Motorista alcoolizado', 'ALTA', 19, 'CANCELADA', 'Outras duas pessoas foram feridas [CANCELAMENTO]: Ligaram fazendo pegadinha', '2025-12-07 09:04:42.259510 +00:00', 212 WHERE NOT EXISTS (SELECT 1 FROM ocorrencias WHERE data_hora_abertura = '2025-12-07 09:04:42.259510 +00:00' AND tipo_ocorrencia = 'Motorista alcoolizado');
INSERT INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) SELECT 'Idoso engasgado', 'ALTA', 9, 'CONCLUIDA', '', '2025-12-07 09:28:04.263550 +00:00', 420 WHERE NOT EXISTS (SELECT 1 FROM ocorrencias WHERE data_hora_abertura = '2025-12-07 09:28:04.263550 +00:00' AND tipo_ocorrencia = 'Idoso engasgado');
INSERT INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) SELECT 'Tropicou e caiu', 'BAIXA', 12, 'CONCLUIDA', '', '2025-12-07 09:32:13.853039 +00:00', 1323 WHERE NOT EXISTS (SELECT 1 FROM ocorrencias WHERE data_hora_abertura = '2025-12-07 09:32:13.853039 +00:00' AND tipo_ocorrencia = 'Tropicou e caiu');
INSERT INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) SELECT 'Pessoa esfaqueada', 'MEDIA', 5, 'CONCLUIDA', '', '2025-12-07 09:43:16.112240 +00:00', 827 WHERE NOT EXISTS (SELECT 1 FROM ocorrencias WHERE data_hora_abertura = '2025-12-07 09:43:16.112240 +00:00' AND tipo_ocorrencia = 'Pessoa esfaqueada');
INSERT INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) SELECT 'Briga', 'MEDIA', 20, 'CONCLUIDA', '', '2025-12-07 10:08:20.795927 +00:00', 869 WHERE NOT EXISTS (SELECT 1 FROM ocorrencias WHERE data_hora_abertura = '2025-12-07 10:08:20.795927 +00:00' AND tipo_ocorrencia = 'Briga');
INSERT INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) SELECT 'Dedo quebrado', 'BAIXA', 7, 'CONCLUIDA', '', '2025-12-07 10:34:28.749086 +00:00', 1781 WHERE NOT EXISTS (SELECT 1 FROM ocorrencias WHERE data_hora_abertura = '2025-12-07 10:34:28.749086 +00:00' AND tipo_ocorrencia = 'Dedo quebrado');
INSERT INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) SELECT 'Armario caiu em cima', 'MEDIA', 13, 'CONCLUIDA', '', '2025-12-07 10:46:19.765696 +00:00', 833 WHERE NOT EXISTS (SELECT 1 FROM ocorrencias WHERE data_hora_abertura = '2025-12-07 10:46:19.765696 +00:00' AND tipo_ocorrencia = 'Armario caiu em cima');
INSERT INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) SELECT 'Quebrou o dedo', 'BAIXA', 14, 'CONCLUIDA', '', '2025-12-07 16:01:57.664367 +00:00', -6011 WHERE NOT EXISTS (SELECT 1 FROM ocorrencias WHERE data_hora_abertura = '2025-12-07 16:01:57.664367 +00:00' AND tipo_ocorrencia = 'Quebrou o dedo');
INSERT INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) SELECT 'morte', 'ALTA', 14, 'CONCLUIDA', 'morreu', '2025-12-07 18:21:52.211104 +00:00', 472 WHERE NOT EXISTS (SELECT 1 FROM ocorrencias WHERE data_hora_abertura = '2025-12-07 18:21:52.211104 +00:00' AND tipo_ocorrencia = 'morte');
INSERT INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) SELECT 'Acidente de transito', 'ALTA', 5, 'CONCLUIDA', '', '2025-12-07 20:56:15.649589 +00:00', 457 WHERE NOT EXISTS (SELECT 1 FROM ocorrencias WHERE data_hora_abertura = '2025-12-07 20:56:15.649589 +00:00' AND tipo_ocorrencia = 'Acidente de transito');
INSERT INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) SELECT 'Esfaqueado na rua', 'ALTA', 10, 'CONCLUIDA', '', '2025-12-08 15:46:02.759325 +00:00', 445 WHERE NOT EXISTS (SELECT 1 FROM ocorrencias WHERE data_hora_abertura = '2025-12-08 15:46:02.759325 +00:00' AND tipo_ocorrencia = 'Esfaqueado na rua');
INSERT INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) SELECT 'Ilhado na enchente', 'MEDIA', 3, 'CONCLUIDA', 'Ruas em volta estão alagada', '2025-12-08 15:57:14.495197 +00:00', 861 WHERE NOT EXISTS (SELECT 1 FROM ocorrencias WHERE data_hora_abertura = '2025-12-08 15:57:14.495197 +00:00' AND tipo_ocorrencia = 'Ilhado na enchente');

-- ====================================
-- POPULANDO A TABELA DE ATENDIMENTOS
-- ====================================
INSERT INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) SELECT 1, 3, '2025-12-07 00:19:43.613275 +00:00', '2025-12-07 00:20:54.728317', '2025-12-07 00:21:01.746475', 7 WHERE NOT EXISTS (SELECT 1 FROM atendimentos WHERE ocorrencia_id = 1);
INSERT INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) SELECT 3, 6, '2025-12-07 09:29:03.232052 +00:00', '2025-12-07 09:30:10.360460', '2025-12-07 09:30:17.714312', 6.4 WHERE NOT EXISTS (SELECT 1 FROM atendimentos WHERE ocorrencia_id = 3);
INSERT INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) SELECT 4, 3, '2025-12-07 09:40:10.834869 +00:00', '2025-12-07 09:41:17.024439', '2025-12-07 09:41:23.785682', 6.4 WHERE NOT EXISTS (SELECT 1 FROM atendimentos WHERE ocorrencia_id = 4);
INSERT INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) SELECT 5, 5, '2025-12-07 09:44:28.824690 +00:00', '2025-12-07 09:46:11.824000', '2025-12-07 09:46:18.824000', 10.3 WHERE NOT EXISTS (SELECT 1 FROM atendimentos WHERE ocorrencia_id = 5);
INSERT INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) SELECT 6, 7, '2025-12-07 10:08:51.404247 +00:00', '2025-12-07 10:10:11.432581', '2025-12-07 10:10:19.183371', 7.9 WHERE NOT EXISTS (SELECT 1 FROM atendimentos WHERE ocorrencia_id = 6);
INSERT INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) SELECT 7, 1, '2025-12-07 10:34:46.663942 +00:00', '2025-12-07 10:35:23.529183', '2025-12-07 10:35:30.459483', 3.5999999999999996 WHERE NOT EXISTS (SELECT 1 FROM atendimentos WHERE ocorrencia_id = 7);
INSERT INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) SELECT 8, 6, '2025-12-07 10:47:26.272907 +00:00', '2025-12-07 10:48:44.272907', '2025-12-07 10:48:51.272907', 7.8 WHERE NOT EXISTS (SELECT 1 FROM atendimentos WHERE ocorrencia_id = 8);
INSERT INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) SELECT 9, 5, '2025-12-07 18:12:07.384557 +00:00', '2025-12-07 18:12:08.404621', '2025-12-07 18:12:15.485868', 0 WHERE NOT EXISTS (SELECT 1 FROM atendimentos WHERE ocorrencia_id = 9);
INSERT INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) SELECT 10, 6, '2025-12-07 18:21:58.574101 +00:00', '2025-12-07 18:24:32.534434', '2025-12-07 18:24:39.535995', 15.3 WHERE NOT EXISTS (SELECT 1 FROM atendimentos WHERE ocorrencia_id = 10);
INSERT INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) SELECT 11, 5, '2025-12-07 20:56:37.795375 +00:00', '2025-12-07 20:58:22.251105', '2025-12-07 20:58:29.211424', 10.3 WHERE NOT EXISTS (SELECT 1 FROM atendimentos WHERE ocorrencia_id = 11);
INSERT INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) SELECT 12, 6, '2025-12-08 15:46:40.017450 +00:00', '2025-12-08 15:47:52.051649', '2025-12-08 15:47:59.106764', 7.3999999999999995 WHERE NOT EXISTS (SELECT 1 FROM atendimentos WHERE ocorrencia_id = 12);
INSERT INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) SELECT 13, 7, '2025-12-08 15:57:55.696821 +00:00', '2025-12-08 15:59:35.696821', '2025-12-08 15:59:42.696821', 10 WHERE NOT EXISTS (SELECT 1 FROM atendimentos WHERE ocorrencia_id = 13);