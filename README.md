Sistema de Cadastro de PAs
🎯 Objetivo:
Cadastrar locais de estações de trabalho (PAs) com as seguintes informações:

Filial (ex: J0 ou J1)

Andar (ex: 00 a 08)

Espinha (ex: 001 a 037)

PA (ex: 01 a 18)

No final, gera um código completo da localização, tipo:

nginx
Copiar
Editar
J101A024E05
Onde:
J1 = filial
01 = andar
A = espinha (conversão opcional, se usar letras)
024 = espinha (pode manter numérica)
E05 = estação (PA 05)

📥 Campos no formulário:
Seletor de filial (dropdown)

Campo numérico para andar

Campo numérico para espinha

Campo numérico para PA

Lista de itens no local (ex: computador, monitor, telefone)
