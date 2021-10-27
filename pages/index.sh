gitlogDir=.gitlog

if [[ ! -e $gitlogDir ]]; then
    mkdir $gitlogDir
fi
for d in */
do
    baseD=$(basename $d)
    [[ $baseD =~ ^(a|.gitlog)$ ]] && continue
    cd "./$baseD"
    git log --author=zchfeng --date=format:'%Y-%m-%d %H:%M:%S' --after='2021-10-20' >  "../$gitlogDir/$baseD.txt"
    cd "../"
done