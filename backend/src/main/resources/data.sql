-- ==========================================
-- POPULANDO A TABELA DE BAIRROS (NÓS)
-- ==========================================
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Jardim América', true, 544.46, 337.81);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Centro', true, 532.97, 468.69);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Setor Leste', false, 793.82, 604.48);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Vila Nova', true, 261.86, 632.99);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Alto da Serra', false, 161.13, 589.97);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Setor Oeste', false, -137.1, 677.87);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Distrito Industrial', false, 10.74, 651.75);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Residencial Esperança', false, -277.11, 839.92);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Recanto Verde', false, 360.41, 1250.3);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Ecoparque Sul', false, 341.89, 716.12);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Nova Alvorada', false, 560.24, 1016.8);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Setor das Palmeiras', false, 220.41, 121.43);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Colina Azul', false, 708.24, 521.66);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Bela Vista', true, -3.41, 274.19);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Morada do Sol', false, 421.82, 206.16);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Setor Central II', true, 714.75, 942.03);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Lago Azul', false, -55.17, 507.05);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Residencial Florença', false, 226.75, 786.14);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Setor Industrial Norte', false, 541.74, 747.25);
MERGE INTO bairros (nome_bairro, tem_base, pos_x, pos_y) KEY(nome_bairro) VALUES ('Vale do Cerrado', true, 413.31, 981.52);

-- ==========================================
-- POPULANDO A TABELA DE RUAS (ARESTAS)
-- ==========================================
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (9, 16, 6.4);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (15, 19, 8.3);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (17, 7, 1.2);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (3, 5, 12.2);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (12, 4, 14);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (13, 7, 9.2);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (13, 6, 19.2);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (5, 9, 13.2);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (16, 3, 3.4);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (8, 10, 12.8);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (20, 1, 14.4);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (14, 3, 18.1);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (2, 18, 1.9);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (6, 11, 15.7);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (1, 17, 14.5);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (3, 4, 19.2);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (14, 19, 18.9);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (15, 18, 18.5);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (20, 2, 14.7);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (15, 20, 12.7);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (17, 15, 7.9);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (4, 12, 6.4);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (5, 15, 8.6);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (6, 2, 13.4);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (14, 15, 9.4);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (9, 3, 18.7);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (18, 7, 1.7);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (13, 7, 17.5);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (18, 9, 9);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (15, 11, 18.3);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (3, 4, 3);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (7, 2, 13.9);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (20, 4, 7.7);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (5, 16, 14.3);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (13, 4, 12.8);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (1, 16, 13.4);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (14, 3, 14.3);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (2, 6, 16.7);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (11, 8, 16.6);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (11, 10, 4.6);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (4, 1, 7);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (11, 7, 14.4);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (13, 5, 6.2);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (9, 20, 2.7);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (13, 15, 8.3);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (17, 13, 16.3);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (10, 14, 7.9);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (8, 1, 17.9);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (9, 2, 19.3);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (16, 17, 18.4);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (6, 14, 9);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (2, 19, 5.1);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (6, 5, 1.3);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (2, 1, 1.4);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (20, 19, 3.7);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (20, 2, 6.5);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (4, 8, 13.1);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (4, 19, 3.8);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (16, 11, 2.8);
MERGE INTO ruas (id_bairro_origem, id_bairro_destino, distancia_km) KEY(id_bairro_origem, id_bairro_destino) VALUES (13, 16, 7.8);

-- ====================================
-- POPULANDO A TABELA DE AMBULANCIAS
-- ====================================
MERGE INTO ambulancias (placa, tipo, status, bairro_base_id) KEY(placa) VALUES ('ZGN0P33', 'UTI', 'DISPONIVEL', 2);
MERGE INTO ambulancias (placa, tipo, status, bairro_base_id) KEY(placa) VALUES ('OVO7I93', 'BASICA', 'INATIVA', 20);
MERGE INTO ambulancias (placa, tipo, status, bairro_base_id) KEY(placa) VALUES ('FFK9P80', 'UTI', 'DISPONIVEL', 4);
MERGE INTO ambulancias (placa, tipo, status, bairro_base_id) KEY(placa) VALUES ('EKH7D24', 'UTI', 'DISPONIVEL', 2);
MERGE INTO ambulancias (placa, tipo, status, bairro_base_id) KEY(placa) VALUES ('KHU8J74', 'UTI', 'DISPONIVEL', 14);
MERGE INTO ambulancias (placa, tipo, status, bairro_base_id) KEY(placa) VALUES ('NBE8A41', 'UTI', 'DISPONIVEL', 16);
MERGE INTO ambulancias (placa, tipo, status, bairro_base_id) KEY(placa) VALUES ('KZC1P62', 'BASICA', 'DISPONIVEL', 1);
MERGE INTO ambulancias (placa, tipo, status, bairro_base_id) KEY(placa) VALUES ('VBF1I65', 'UTI', 'DISPONIVEL', 20);
MERGE INTO ambulancias (placa, tipo, status, bairro_base_id) KEY(placa) VALUES ('DPL6V39', 'UTI', 'INATIVA', 1);
MERGE INTO ambulancias (placa, tipo, status, bairro_base_id) KEY(placa) VALUES ('YED6Y11', 'UTI', 'INATIVA', 2);
MERGE INTO ambulancias (placa, tipo, status, bairro_base_id) KEY(placa) VALUES ('NJZ5V31', 'BASICA', 'DISPONIVEL', 20);

-- ====================================
-- POPULANDO A TABELA DE EQUIPES
-- ====================================
MERGE INTO equipes (ambulancia_id, ativo) KEY(ambulancia_id) VALUES (1, true);
MERGE INTO equipes (ambulancia_id, ativo) KEY(ambulancia_id) VALUES (4, true);
MERGE INTO equipes (ambulancia_id, ativo) KEY(ambulancia_id) VALUES (11, true);
MERGE INTO equipes (ambulancia_id, ativo) KEY(ambulancia_id) VALUES (7, true);
MERGE INTO equipes (ambulancia_id, ativo) KEY(ambulancia_id) VALUES (3, true);
MERGE INTO equipes (ambulancia_id, ativo) KEY(ambulancia_id) VALUES (6, true);
MERGE INTO equipes (ambulancia_id, ativo) KEY(ambulancia_id) VALUES (5, true);
MERGE INTO equipes (ambulancia_id, ativo) KEY(ambulancia_id) VALUES (8, true);

-- ====================================
-- POPULANDO A TABELA DE PROFISSIONAIS
-- ====================================
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Drauzio Varella', 'MEDICO', 'drauziovarella@gmail.com', true, 1);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Meredith Grey', 'MEDICO', 'meredithzinha@yahoo.com', true, 5);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Dominic Toretto', 'CONDUTOR', 'toretto@toretto.com', true, 1);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Paula Teixeira', 'ENFERMEIRO', 'paulinhadopagode@gmail.com', true, 1);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Maria José', 'ENFERMEIRO', 'maryjoseph@outlook.com', true, 4);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Ronaldo Filho', 'MEDICO', 'rorofilho@outlook.com', true, 6);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Gabriela Lisboa', 'ENFERMEIRO', 'gabrielisboa@gmail.com', true, 3);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Juremaldo Sales', 'CONDUTOR', 'juremildo@outlook.com', true, 3);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Rolando Barros', 'CONDUTOR', 'fuirolando@yahoo.com.br', true, 4);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Um Dois Tres de Oliveira', 'CONDUTOR', 'umdoistres@gmail.com', true, 5);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Joana Darc', 'ENFERMEIRO', 'joanadarc@joana.com', true, 5);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Luiz Felipe', 'ENFERMEIRO', 'felipito@outlook.com', true, 6);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Jessica Ferreira', 'CONDUTOR', 'jaacaboujessica@gmail.com', true, 6);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Camila Cabo', 'MEDICO', 'milacabo@gmail.com', true, 7);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Bianca Biquestre', 'ENFERMEIRO', 'bibiquestre@yahoo.com.br', true, 8);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Julia Souza', 'CONDUTOR', 'jusouza@gmail.com', true, 7);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Ameinda Silva', 'ENFERMEIRO', 'ameinda@gmail.com', true, 7);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Pedro Lucas', 'MEDICO', 'pedrolucas@outlook.com', true, 2);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Pericles', 'CONDUTOR', 'periclys@outlook.com', true, 2);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Neuma Moura', 'ENFERMEIRO', 'neuminha@yahoo.com.br', true, 2);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Davi Augusto', 'MEDICO', 'daviaug23@gmail.com', true, 8);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Marcelo Ferreira', 'CONDUTOR', 'celoferreira@yahoo.com', true, 8);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Larissa Santana', 'MEDICO', 'larisantana@gmail.com', true, null);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Leila Araujo', 'ENFERMEIRO', 'araujoleila@gmail.com', true, null);
MERGE INTO profissionais (nome, funcao, email_contato, ativo, equipe_id) KEY(email_contato) VALUES ('Amanda Sousa', 'CONDUTOR', 'mandexsousa@hotmail.com', true, null);

-- ====================================
-- POPULANDO A TABELA DE OCORRENCIAS
-- ====================================
MERGE INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) KEY(data_hora_abertura, tipo_ocorrencia) VALUES ('Muito sono', 'MEDIA', 1, 'CONCLUIDA', '', '2025-12-07 00:18:11.338847 +00:00', 806);
MERGE INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) KEY(data_hora_abertura, tipo_ocorrencia) VALUES ('Motorista alcoolizado', 'ALTA', 19, 'CANCELADA', 'Outras duas pessoas foram feridas [CANCELAMENTO]: Ligaram fazendo pegadinha', '2025-12-07 09:04:42.259510 +00:00', 212);
MERGE INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) KEY(data_hora_abertura, tipo_ocorrencia) VALUES ('Idoso engasgado', 'ALTA', 9, 'CONCLUIDA', '', '2025-12-07 09:28:04.263550 +00:00', 420);
MERGE INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) KEY(data_hora_abertura, tipo_ocorrencia) VALUES ('Tropicou e caiu', 'BAIXA', 12, 'CONCLUIDA', '', '2025-12-07 09:32:13.853039 +00:00', 1323);
MERGE INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) KEY(data_hora_abertura, tipo_ocorrencia) VALUES ('Pessoa esfaqueada', 'MEDIA', 5, 'CONCLUIDA', '', '2025-12-07 09:43:16.112240 +00:00', 827);
MERGE INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) KEY(data_hora_abertura, tipo_ocorrencia) VALUES ('Briga', 'MEDIA', 20, 'CONCLUIDA', '', '2025-12-07 10:08:20.795927 +00:00', 869);
MERGE INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) KEY(data_hora_abertura, tipo_ocorrencia) VALUES ('Dedo quebrado', 'BAIXA', 7, 'CONCLUIDA', '', '2025-12-07 10:34:28.749086 +00:00', 1781);
MERGE INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) KEY(data_hora_abertura, tipo_ocorrencia) VALUES ('Armario caiu em cima', 'MEDIA', 13, 'CONCLUIDA', '', '2025-12-07 10:46:19.765696 +00:00', 833);
MERGE INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) KEY(data_hora_abertura, tipo_ocorrencia) VALUES ('Quebrou o dedo', 'BAIXA', 14, 'CONCLUIDA', '', '2025-12-07 16:01:57.664367 +00:00', -6011);
MERGE INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) KEY(data_hora_abertura, tipo_ocorrencia) VALUES ('morte', 'ALTA', 14, 'CONCLUIDA', 'morreu', '2025-12-07 18:21:52.211104 +00:00', 472);
MERGE INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) KEY(data_hora_abertura, tipo_ocorrencia) VALUES ('Acidente de transito', 'ALTA', 5, 'CONCLUIDA', '', '2025-12-07 20:56:15.649589 +00:00', 457);
MERGE INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) KEY(data_hora_abertura, tipo_ocorrencia) VALUES ('Esfaqueado na rua', 'ALTA', 10, 'CONCLUIDA', '', '2025-12-08 15:46:02.759325 +00:00', 445);
MERGE INTO ocorrencias (tipo_ocorrencia, gravidade, local_bairro_id, status, observacao, data_hora_abertura, sla_final) KEY(data_hora_abertura, tipo_ocorrencia) VALUES ('Ilhado na enchente', 'MEDIA', 3, 'CONCLUIDA', 'Ruas em volta estão alagada', '2025-12-08 15:57:14.495197 +00:00', 861);

-- ====================================
-- POPULANDO A TABELA DE ATENDIMENTOS
-- ====================================
MERGE INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) KEY(ocorrencia_id) VALUES (1, 3, '2025-12-07 00:19:43.613275 +00:00', '2025-12-07 00:20:54.728317', '2025-12-07 00:21:01.746475', 7);
MERGE INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) KEY(ocorrencia_id) VALUES (3, 6, '2025-12-07 09:29:03.232052 +00:00', '2025-12-07 09:30:10.360460', '2025-12-07 09:30:17.714312', 6.4);
MERGE INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) KEY(ocorrencia_id) VALUES (4, 3, '2025-12-07 09:40:10.834869 +00:00', '2025-12-07 09:41:17.024439', '2025-12-07 09:41:23.785682', 6.4);
MERGE INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) KEY(ocorrencia_id) VALUES (5, 5, '2025-12-07 09:44:28.824690 +00:00', '2025-12-07 09:46:11.824000', '2025-12-07 09:46:18.824000', 10.3);
MERGE INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) KEY(ocorrencia_id) VALUES (6, 7, '2025-12-07 10:08:51.404247 +00:00', '2025-12-07 10:10:11.432581', '2025-12-07 10:10:19.183371', 7.9);
MERGE INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) KEY(ocorrencia_id) VALUES (7, 1, '2025-12-07 10:34:46.663942 +00:00', '2025-12-07 10:35:23.529183', '2025-12-07 10:35:30.459483', 3.5999999999999996);
MERGE INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) KEY(ocorrencia_id) VALUES (8, 6, '2025-12-07 10:47:26.272907 +00:00', '2025-12-07 10:48:44.272907', '2025-12-07 10:48:51.272907', 7.8);
MERGE INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) KEY(ocorrencia_id) VALUES (9, 5, '2025-12-07 18:12:07.384557 +00:00', '2025-12-07 18:12:08.404621', '2025-12-07 18:12:15.485868', 0);
MERGE INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) KEY(ocorrencia_id) VALUES (10, 6, '2025-12-07 18:21:58.574101 +00:00', '2025-12-07 18:24:32.534434', '2025-12-07 18:24:39.535995', 15.3);
MERGE INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) KEY(ocorrencia_id) VALUES (11, 5, '2025-12-07 20:56:37.795375 +00:00', '2025-12-07 20:58:22.251105', '2025-12-07 20:58:29.211424', 10.3);
MERGE INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) KEY(ocorrencia_id) VALUES (12, 6, '2025-12-08 15:46:40.017450 +00:00', '2025-12-08 15:47:52.051649', '2025-12-08 15:47:59.106764', 7.3999999999999995);
MERGE INTO atendimentos (ocorrencia_id, ambulancia_id, data_hora_despacho, data_hora_chegada, data_hora_conclusao, distancia_km) KEY(ocorrencia_id) VALUES (13, 7, '2025-12-08 15:57:55.696821 +00:00', '2025-12-08 15:59:35.696821', '2025-12-08 15:59:42.696821', 10);