#!/usr/bin/awk -f

function rtrim(s){sub(/[ \t\r\n]+$/,"",s);return s}
function ltrim(s){sub(/^[ \t\r\n]+/,"",s);return s}
function leadws(s){match(s,/^[ \t]*/);return substr(s,RSTART,RLENGTH)}

{
  line = rtrim($0)

  if (line ~ "^Changes in version[ \t]*" v "$") {
    in_section = 1
    base_indent = ""
    print "#### " line "\n"
    next
  }

  if (in_section && line ~ "^Changes in version[ \t]*[0-9.]+") exit

  if (in_section) {
    ws = leadws($0)
    content = rtrim(substr($0,length(ws)+1))
    if (base_indent == "") base_indent = ws
    if (content != "") {
        if (length(ws) == length(base_indent)) {
            print "* " ltrim(content)
        } else if (length(ws) > length(base_indent)) {
            print "  " ltrim(content)
        } else {
            print "* " ltrim(content)
        }
    }
  }
}