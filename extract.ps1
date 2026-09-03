Copy-Item TutorTrust_PK_Antigravity_Prompts.docx prompts.zip -Force
Expand-Archive prompts.zip -DestinationPath docx_temp -Force
[xml]$doc = Get-Content "docx_temp\word\document.xml" -Raw
$ns = @{ w = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" }
$texts = Select-Xml -Xml $doc -XPath "//w:t" -Namespace $ns | ForEach-Object { $_.Node.InnerText }
$texts | Out-File "prompts.txt"
Remove-Item docx_temp -Recurse -Force
Remove-Item prompts.zip -Force
